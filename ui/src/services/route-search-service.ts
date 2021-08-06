import { RouteSearch } from "../interfaces/route-search";
import { BaseService } from "./base-service";

export class RouteSearchService extends BaseService {
    async performSearch(routeSearchParams: RouteSearch): Promise<any> {
        const request = {
            fromLatLng: routeSearchParams.from?.center,
            toLatLng: routeSearchParams.to?.center,
            ...routeSearchParams
        };

        console.log(request);

        return await this.post("/RouteSearch", request);
    }
}
