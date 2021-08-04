export interface LocationSearchResponse {
    attribution: string;
    results: LocationSearchResult[];
}

export interface LocationSearchResult {
    name: string;
    description?: string;
    relevance: number;
}

export type NullableLocationSearchResult = LocationSearchResult | null;
