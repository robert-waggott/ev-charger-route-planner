import { Body, Controller, Get, Post } from "@nestjs/common";
import { LocationSearchRequestDto } from "src/dtos/location-search-request.dto";
import { LocationSearchResponse } from "src/interfaces/location-search-response.interface";
import { LocationSearchService } from "src/services/location-search.service";

@Controller("LocationSearch")
export class LocationSearchController {
    constructor(private locationSearchService: LocationSearchService) {}

    @Post()
    async post(@Body() request: LocationSearchRequestDto): Promise<LocationSearchResponse> {
        const response = await this.locationSearchService.forwardGeocode(request.searchTerm);

        return response;
    }
}
