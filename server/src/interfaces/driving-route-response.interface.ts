import { LineString } from "geojson";

export interface DrivingRouteResponse {
    summary: string;
    durationInMinutes: number;
    geometry: LineString;
    numberOfSteps: number;
    distanceInMeters: number;
    distanceInKm: number;
    distanceInMiles: number;
    steps: DrivingRouteStep[];
}

export interface DrivingRouteStep {
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
