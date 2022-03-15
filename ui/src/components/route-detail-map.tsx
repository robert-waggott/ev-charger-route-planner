import maplibregl from "maplibre-gl";
import React, { MutableRefObject } from "react";
import styled from "styled-components";

import { ConfigContext } from "../App";
import { Route } from "../interfaces/route";
import { RouteBuildingService } from "../services/route-building-service";

interface RouteDetailMapProps {
    route: Route;
}

const MapContainerDiv = styled.div`
    width: 100%;
    height: 300px;
`;

export const RouteDetailMap = (props: RouteDetailMapProps) => {
    const { config } = React.useContext(ConfigContext);
    const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;
    const mapRef = React.useRef() as MutableRefObject<maplibregl.Map>;

    React.useEffect(() => {
        if (config) {
            mapRef.current = new maplibregl.Map({
                container: mapContainerRef.current,
                style: `https://api.maptiler.com/maps/streets/style.json?key=${config?.MapTilerAPIKey}`, // todo - refactor...
                center: [-1.605333, 52.890665],
                zoom: 5
            });

            mapRef.current.on("load", async () => {
                await new RouteBuildingService(props.route, mapRef.current).mapRoute();
            });
        }
    }, [config, props.route]);

    return <MapContainerDiv ref={mapContainerRef} />;
};
