import { LatLng } from "./lat-lng.dto";

export enum ChargeDistanceType {
    Miles = "miles",
    Km = "km"
}

export class RouteSearchRequestDto {
    fromLatLng: LatLng;
    toLatLng: LatLng;
    chargeDistance: number;
    chargeDistanceType: ChargeDistanceType;
    excludeTolls: boolean;
    excludeMotorways: boolean;
    excludeFerries: boolean;
    includeTraffic: boolean;
}
