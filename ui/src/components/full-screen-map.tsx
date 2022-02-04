import maplibregl, { LngLatBounds, LngLatLike } from "maplibre-gl";
import React, { MutableRefObject } from "react";
import styled from "styled-components";
import { RouteContext } from "../App";
import { NullableConfig } from "../interfaces/config";
import { ConfigService } from "../services/config-service";

export interface FullScreenMapProps {}

const MapContainerDiv = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
`;

export const FullScreenMap = (props: FullScreenMapProps) => {
    const [config, setConfig] = React.useState<NullableConfig>(null);
    const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;
    const mapRef = React.useRef() as MutableRefObject<maplibregl.Map>;
    const { route, setRoute } = React.useContext(RouteContext);

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

            mapRef.current.on("load", () => {
                if (route) {
                    if (mapRef.current.getLayer("route")) {
                        mapRef.current.removeLayer("route");
                    }

                    if (mapRef.current.getSource("route")) {
                        mapRef.current.removeSource("route");
                    }

                    mapRef.current.addSource("route", {
                        type: "geojson",
                        data: route.geometry as any
                    });

                    mapRef.current.addLayer({
                        id: "route",
                        type: "line",
                        source: "route",
                        layout: {
                            "line-join": "round",
                            "line-cap": "round"
                        },
                        paint: {
                            "line-color": "#228C22",
                            "line-width": 5,
                            "line-dasharray": [1, 2]
                        }
                    });
                    var bounds = new LngLatBounds();

                    route.geometry.coordinates.forEach((coord) => {
                        bounds.extend([coord[0], coord[1]] as LngLatLike);
                    });

                    mapRef.current.fitBounds(bounds, { padding: 30 });
                }
            });
        }
    }, [config, route]);

    return <MapContainerDiv ref={mapContainerRef} id="map" />;
};
