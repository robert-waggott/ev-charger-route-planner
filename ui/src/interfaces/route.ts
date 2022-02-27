import { LineString } from "geojson";

export interface Route {
    summary: string;
    durationInMinutes: number;
    geometry: LineString;
    numberOfSteps: number;
    distanceInMeters: number;
    distanceInKm: number;
    distanceInMiles: number;
}
