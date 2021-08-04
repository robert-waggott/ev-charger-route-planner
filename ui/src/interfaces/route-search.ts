import { NullableLocationSearchResult } from "./search-result";

export enum ChargeDistanceType {
    Miles = "miles",
    Km = "km"
}

export interface RouteSearch {
    from: NullableLocationSearchResult;
    to: NullableLocationSearchResult;
    chargeDistance: number | undefined;
    chargeDistanceType: ChargeDistanceType;
    excludeTolls: boolean;
    excludeMotorways: boolean;
    excludeFerries: boolean;
    includeTraffic: boolean;
}
