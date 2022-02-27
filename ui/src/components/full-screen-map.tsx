import maplibregl from "maplibre-gl";
import React, { MutableRefObject } from "react";
import styled from "styled-components";

import { ConfigContext } from "../App";
import { ChargeDevice } from "../interfaces/charge-points-response";
import { Route } from "../interfaces/route";
import { RouteBuildingService } from "../services/route-building-service";

export interface FullScreenMapProps {
    route: Route | null;
    onChargeDeviceChanged: (chargeDevice: ChargeDevice | null) => unknown;
}

export interface MappedRouteProps {
    map: maplibregl.Map;
    route: Route | null;
    onChargeDeviceChanged: (chargeDevice: ChargeDevice | null) => unknown;
}

const MapContainerDiv = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
`;

export const MappedRoute = (props: MappedRouteProps) => {
    async function mapRoute() {
        if (props.route) {
            await new RouteBuildingService(props.route, props.map, (chargeDevice) => {
                props.onChargeDeviceChanged(chargeDevice);
            }).mapRoute();
        }
    }

    React.useEffect(() => {
        mapRoute();
    }, [props.route]);

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
            <MappedRoute map={mapRef.current} route={props.route} onChargeDeviceChanged={props.onChargeDeviceChanged} />
        </MapContainerDiv>
    );
};
