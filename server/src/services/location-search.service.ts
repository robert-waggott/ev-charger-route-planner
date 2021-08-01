import { Injectable } from "@nestjs/common";
import axios from "axios";
import { LatLng } from "src/dtos/lat-lng.dto";
import { LocationSearchResponse } from "src/interfaces/location-search-response.interface";

@Injectable()
export class LocationSearchService {
    async forwardGeocode(searchTerm: string): Promise<LocationSearchResponse> {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.MAPBOXAPIKEY}&country=gb&types=region,postcode,district,place,locality,neighborhood,address,poi&limit=5`;

        const response = await axios.get(url);

        return {
            attribution: response.data.attribution,
            results: response.data.features.map((feature: any) => ({
                name: feature.text,
                description: feature.place_name,
                center: new LatLng(feature.center[1], feature.center[0]),
                relevance: feature.relevance
            }))
        };
    }
}
