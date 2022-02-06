import maplibregl from "maplibre-gl";
import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { RouteContext, SelectedChargeDeviceContext } from "../App";
import { NullableConfig } from "../interfaces/config";
import { ConfigService } from "../services/config-service";
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
    const [config, setConfig] = React.useState<NullableConfig>(null);
    const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;
    const mapRef = React.useRef() as MutableRefObject<maplibregl.Map>;

    async function getConfig() {
        const config = await new ConfigService().getConfig();

        setConfig(config);
    }

    React.useEffect(() => {
        getConfig();
    }, []);

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
