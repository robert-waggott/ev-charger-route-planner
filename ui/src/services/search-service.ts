import { SearchResult } from "../interfaces/search-result";
import { BaseService } from "./base-service";

export class SearchService extends BaseService {
    async performSearch(searchTerm: string): Promise<SearchResult[]> {
        return await this.post("/location-search", { searchTerm: searchTerm });

        // return [
        //     {
        //         name: "Stotfold"
        //     },
        //     {
        //         name: "Stotfold Watermill & Nature Reserve",
        //         address: "Mill Lane, Stotfold, Bedfordshire"
        //     },
        //     {
        //         name: "Stotfold Road",
        //         address: "Arlesey"
        //     },
        //     {
        //         name: "Stotfold Pharmacy",
        //         address: "Brook Street, Stotfold, Bedfordshire"
        //     }
        // ];
    }

    sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
