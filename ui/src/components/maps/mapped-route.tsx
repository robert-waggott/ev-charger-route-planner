import maplibregl from "maplibre-gl";
import React, { MutableRefObject } from "react";

import { ChargeDevice } from "../../interfaces/charge-points-response";
import { Route, Step } from "../../interfaces/route";
import { RouteBuildingService } from "../../services/route-building-service";

export interface MappedRouteProps {
    map: maplibregl.Map;
    route: Route | null;
    onChargeDeviceChanged: (chargeDevice: ChargeDevice | null) => unknown;
}

export const MappedRoute = ({ route, map, onChargeDeviceChanged }: MappedRouteProps) => {
    React.useEffect(() => {
        const mapRoute = async () => {
            if (route) {
                await new RouteBuildingService(route, map, (chargeDevice) => {
                    onChargeDeviceChanged(chargeDevice);
                }).mapRoute();
            }
        };

        mapRoute();
    }, [route, map, onChargeDeviceChanged]);

    return <></>;
};
