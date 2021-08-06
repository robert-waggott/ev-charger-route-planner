import { LatLng } from "./lat-lng";

export interface LocationSearchResponse {
    attribution: string;
    results: LocationSearchResult[];
}

export interface LocationSearchResult {
    name: string;
    description?: string;
    center: LatLng;
    relevance: number;
}

export type NullableLocationSearchResult = LocationSearchResult | null;
