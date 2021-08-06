import { LineString } from "geojson";

export class DrivingRouteResponse {
    geometry: LineString;
    numberOfSteps: number;
    distanceInMeters: number;
    distanceInKm: number;
    distanceInMiles: number;
}
