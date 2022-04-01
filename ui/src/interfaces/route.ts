import { LatLng } from "./lat-lng";
import { LineString } from "geojson";

export interface Route {
    summary: string;
    durationInMinutes: number;
    geometry: LineString;
    numberOfSteps: number;
    distanceInMeters: number;
    distanceInKm: number;
    distanceInMiles: number;
    steps: Step[];
}

export interface Step {
    title: string | null;
    summary: string;
    location: LatLng;
    geometry: LineString;
    durationInMinutes: number;
    distanceInKm: number;
    distanceInMile: number;
}
