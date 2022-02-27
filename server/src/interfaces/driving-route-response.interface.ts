import { LineString } from "geojson";

export class DrivingRouteResponse {
    summary: string;
    duration: number;
    geometry: LineString;
    numberOfSteps: number;
    distanceInMeters: number;
    distanceInKm: number;
    distanceInMiles: number;
}
