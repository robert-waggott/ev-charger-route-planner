import { Injectable } from "@nestjs/common";
import axios from "axios";

import { RouteSearchRequestDto } from "src/dtos/route-search-request.dto";
import { DrivingRouteResponse } from "src/interfaces/driving-route-response.interface";

@Injectable()
export class RouteSearchService {
    async getDrivingRoutes(routeSearchRequest: RouteSearchRequestDto): Promise<DrivingRouteResponse[]> {
        const params: [string, string][] = [
            ["access_token", process.env.MAPBOXAPIKEY],
            ["alternatives", "true"],
            ["steps", "true"],
            ["overview", "full"],
            ["annotations", "distance,duration,speed,congestion,maxspeed,closure"],
            ["geometries", "geojson"]
        ];

        const exclusionList = this.getExclusionList(routeSearchRequest);

        if (exclusionList) {
            params.push(["exclude", exclusionList]);
        }

        const query = params.map((param) => param[0] + "=" + param[1]).join("&");
        const profile = routeSearchRequest.includeTraffic ? "mapbox/driving-traffic" : "mapbox/driving";
        const url = `https://api.mapbox.com/directions/v5/${profile}/${routeSearchRequest.fromLatLng.lng},${routeSearchRequest.fromLatLng.lat};${routeSearchRequest.toLatLng.lng},${routeSearchRequest.toLatLng.lat}?${query}`;

        console.log(url);

        const response = await axios.get(url);

        return response.data.routes.map((route) => {
            return {
                summary: route.legs[0].summary,
                durationInMinutes: route.legs[0].duration / 60,
                geometry: route.geometry,
                numberOfSteps: route.legs.length,
                distanceInMeters: route.distance,
                distanceInKm: route.distance / 1000,
                distanceInMiles: route.distance * 0.000621371,
                steps: route.legs[0].steps.map((step) => ({
                    title: step.name,
                    summary: step.maneuver.instruction,
                    location: {
                        lat: step.maneuver.location[1],
                        lng: step.maneuver.location[0]
                    },
                    geometry: step.geometry,
                    durationInMinutes: step.duration / 60,
                    distanceInKm: step.distance / 1000,
                    distanceInMiles: step.distance * 0.000621371
                }))
            };
        });
    }

    getExclusionList(routeSearchRequest: RouteSearchRequestDto) {
        const exclusions: string[] = [];

        if (routeSearchRequest.excludeTolls) {
            exclusions.push("toll");
        }

        if (routeSearchRequest.excludeMotorways) {
            exclusions.push("motorway");
        }

        if (routeSearchRequest.excludeFerries) {
            exclusions.push("ferry");
        }

        return exclusions.join(",");
    }
}
