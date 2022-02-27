import { Injectable } from "@nestjs/common";
import axios from "axios";
import { LatLng } from "src/dtos/lat-lng.dto";
import { RouteSearchRequestDto } from "src/dtos/route-search-request.dto";
import { DrivingRouteResponse } from "src/interfaces/driving-route-response.interface";
import { LocationSearchResponse } from "src/interfaces/location-search-response.interface";

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

        const response = await axios.get(url);

        console.log(response.data.routes[0].legs);

        const firstRoute = response.data.routes[0];

        return response.data.routes.map((route) => {
            return {
                summary: route.legs[0].summary,
                durationInMinutes: route.legs[0].duration / 60,
                geometry: route.geometry,
                numberOfSteps: route.legs.length,
                distanceInMeters: route.distance,
                distanceInKm: route.distance / 1000,
                distanceInMiles: route.distance * 0.000621371
            };
        });

        /* 
{
  weight_typical: 13944.985,
  duration_typical: 14675.718,
  weight_name: 'auto',
  weight: 14034.234,
  duration: 14788.699,
  distance: 346215.594,
  legs: [
    {
      via_waypoints: [],
      admins: [Array],
      incidents: [Array],
      annotation: [Object],
      weight_typical: 13944.985,
      duration_typical: 14675.718,
      weight: 14034.234,
      duration: 14788.699,
      steps: [Array],
      distance: 346215.594,
      summary: 'M1, M5'
    }
  ],
  geometry: {
    coordinates: [
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array], [Array], [Array], [Array], [Array], [Array],
      [Array], [Array],
      ... 4864 more items
    ],
    type: 'LineString'
  }
}        
        */
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
