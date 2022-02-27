import { LineString } from "geojson";

export interface Route {
    summary: string;
    duration: number;
    geometry: LineString;
    numberOfSteps: number;
    distanceInMeters: number;
    distanceInKm: number;
    distanceInMiles: number;
}
