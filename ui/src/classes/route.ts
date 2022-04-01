import { LatLng } from "./../interfaces/lat-lng";
import { LineString } from "geojson";

export class Route {
    summary!: string;
    durationInMinutes!: number;
    geometry!: LineString;
    numberOfSteps!: number;
    distanceInMeters!: number;
    distanceInKm!: number;
    distanceInMiles!: number;
    steps!: Step[];
}

export class Step {
    title?: string;
    summary!: string;
    location!: LatLng;
    geometry!: LineString;
    durationInMinutes!: number;
    distanceInKm!: number;
    distanceInMiles!: number;

    get name() {
        if (this.title) {
            return this.title;
        }

        return this.summary.substring(0, 50) + "...";
    }
}
