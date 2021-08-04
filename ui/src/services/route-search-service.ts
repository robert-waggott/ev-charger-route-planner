import { RouteSearch } from "../interfaces/route-search";
import { LocationSearchResponse } from "../interfaces/search-result";
import { BaseService } from "./base-service";

export class RouteSearchService extends BaseService {
    async performSearch(routeSearchParams: RouteSearch): Promise<any> {
        return await this.post("/RouteSearch", {
            from: "",
            to: "",
            ...routeSearchParams
        });
    }
}
