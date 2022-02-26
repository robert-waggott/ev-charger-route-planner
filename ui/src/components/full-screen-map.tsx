import maplibregl from "maplibre-gl";
import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { ConfigContext, RouteContext, SelectedChargeDeviceContext } from "../App";
import { RouteBuildingService } from "../services/route-building-service";

export interface FullScreenMapProps {}

export interface MappedRouteProps {
    map: maplibregl.Map;
}

const MapContainerDiv = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
`;

export const MappedRoute = (props: MappedRouteProps) => {
    const { route } = React.useContext(RouteContext);
    const { setChargeDevice } = React.useContext(SelectedChargeDeviceContext);

    async function mapRoute() {
        if (route) {
            await new RouteBuildingService(route, props.map, (chargeDevice) => {
                setChargeDevice(chargeDevice);
            }).mapRoute();
        }
    }

    React.useEffect(() => {
        mapRoute();
    }, [route]);

    return <></>;
};

export const FullScreenMap = (props: FullScreenMapProps) => {
    const { config } = React.useContext(ConfigContext);
    const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;
    const mapRef = React.useRef() as MutableRefObject<maplibregl.Map>;

    React.useEffect(() => {
        if (config) {
            mapRef.current = new maplibregl.Map({
                container: mapContainerRef.current,
                style: `https://api.maptiler.com/maps/streets/style.json?key=${config?.MapTilerAPIKey}`,
                center: [-1.631291, 52.48278],
                zoom: 4
            });
        }
    }, [config]);

    return (
        <MapContainerDiv ref={mapContainerRef} id="map">
            <MappedRoute map={mapRef.current} />
        </MapContainerDiv>
    );
};
