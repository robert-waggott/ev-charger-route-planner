import { plainToInstance } from "class-transformer";

import { Route } from "../classes/route";
import { RouteSearch } from "../interfaces/route-search";
import { BaseService } from "./base-service";

export class RouteSearchService extends BaseService {
    async performSearch(routeSearchParams: RouteSearch): Promise<Route[]> {
        const request = {
            fromLatLng: routeSearchParams.from?.center,
            toLatLng: routeSearchParams.to?.center,
            ...routeSearchParams
        };

        const response = (await this.post("/RouteSearch", request)) as any[];

        return plainToInstance(Route, response);
    }
}
