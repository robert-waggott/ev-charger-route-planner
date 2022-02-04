import { Module } from "@nestjs/common";
import { ChargingPointsController } from "./controllers/charging-points.controller";
import { ConfigController } from "./controllers/config.controller";
import { LocationSearchController } from "./controllers/location-search.controller";
import { RouteSearchController } from "./controllers/route-search.controller";
import { ChargingPointsService } from "./services/charging-points.service";
import { LocationSearchService } from "./services/location-search.service";
import { RouteSearchService } from "./services/route-search.service";

@Module({
    imports: [],
    controllers: [ConfigController, LocationSearchController, RouteSearchController, ChargingPointsController],
    providers: [LocationSearchService, RouteSearchService, ChargingPointsService]
})
export class AppModule {}
