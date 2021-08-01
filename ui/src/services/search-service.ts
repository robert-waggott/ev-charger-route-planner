import { LocationSearchResponse } from "../interfaces/search-result";
import { BaseService } from "./base-service";

export class SearchService extends BaseService {
    async performSearch(searchTerm: string): Promise<LocationSearchResponse> {
        return await this.post("/LocationSearch", { searchTerm: searchTerm });
    }
}
