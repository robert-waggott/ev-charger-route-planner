import { Body, Controller, Get, Post } from "@nestjs/common";
import { LocationSearchRequestDto } from "src/dtos/location-search-request.dto";
import { Config } from "src/interfaces/config.interface";
import { LocationSearchResult } from "src/interfaces/search-result.interface";

@Controller("LocationSearch")
export class LocationSearchController {
    @Post()
    post(@Body() request: LocationSearchRequestDto): LocationSearchResult[] {
        return [];
    }
}
