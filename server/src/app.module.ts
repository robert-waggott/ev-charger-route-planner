import { Module } from "@nestjs/common";
import { ConfigController } from "./controllers/config.controller";
import { LocationSearchController } from "./controllers/location-search.controller";
import { RouteSearchController } from "./controllers/route-search.controller";
import { LocationSearchService } from "./services/location-search.service";
import { RouteSearchService } from "./services/route-search.service";

@Module({
    imports: [],
    controllers: [ConfigController, LocationSearchController, RouteSearchController],
    providers: [LocationSearchService, RouteSearchService]
})
export class AppModule {}
