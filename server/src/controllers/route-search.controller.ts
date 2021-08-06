import { Body, Controller, Post } from "@nestjs/common";
import { RouteSearchRequestDto } from "src/dtos/route-search-request.dto";
import { RouteSearchService } from "src/services/route-search.service";

@Controller("RouteSearch")
export class RouteSearchController {
    constructor(private routeSearchService: RouteSearchService) {}

    @Post()
    async post(@Body() request: RouteSearchRequestDto): Promise<any> {
        this.routeSearchService.getDrivingRoute(request);

        return null;
    }
}