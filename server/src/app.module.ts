import { Module } from "@nestjs/common";
import { AppController } from "./controllers/app.controller";
import { ConfigController } from "./controllers/config.controller";
import { LocationSearchController } from "./controllers/location-search.controller";
import { LocationSearchService } from "./services/location-search.service";

@Module({
    imports: [],
    controllers: [AppController, ConfigController, LocationSearchController],
    providers: [LocationSearchService]
})
export class AppModule {}
