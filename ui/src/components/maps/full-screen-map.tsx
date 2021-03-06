import maplibregl from "maplibre-gl";
import React, { ForwardedRef, MutableRefObject } from "react";
import styled from "styled-components";

import { ConfigContext } from "../../App";
import { ChargeDevice } from "../../interfaces/charge-points-response";
import { Route, Step } from "../../interfaces/route";
import { MappedRoute } from "./mapped-route";

interface FullScreenMapProps {
    route: Route | null;
    step: Step | null;
    onChargeDeviceChanged: (chargeDevice: ChargeDevice | null) => unknown;
}

const MapContainerDiv = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
`;

export const FullScreenMap = (props: FullScreenMapProps) => {
    const { config } = React.useContext(ConfigContext);
    const mapContainerRef = React.useRef() as MutableRefObject<HTMLDivElement>;
    const mapRef = React.useRef() as MutableRefObject<maplibregl.Map>;

    React.useEffect(() => {
        if (config) {
            if (mapRef.current) {
                mapRef.current.setStyle(config.mapTilerURL);
            } else {
                mapRef.current = new maplibregl.Map({
                    container: mapContainerRef.current,
                    style: config.mapTilerURL,
                    center: [-1.631291, 52.48278],
                    zoom: 4
                });
            }
        }
    }, [config]);

    React.useEffect(() => {
        if (props.step && mapRef.current) {
            mapRef.current.flyTo({
                center: [props.step.location.lng, props.step.location.lat],
                zoom: 12
            });
        }
    }, [props.step]);

    // todo: use forwardRef and move mappedRoute into App to stop it from being re-built when the selected step is changed.
    return (
        <MapContainerDiv ref={mapContainerRef} id="map">
            <MappedRoute map={mapRef.current} route={props.route} onChargeDeviceChanged={props.onChargeDeviceChanged} />
        </MapContainerDiv>
    );
};
