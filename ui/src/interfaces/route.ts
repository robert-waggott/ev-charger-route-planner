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
    title: string;
    summary: string;
    location: {
        lat: number;
        lng: number;
    };
    geometry: LineString;
    durationInMinutes: number;
    distanceInKm: number;
    distanceInMiles: number;
}
