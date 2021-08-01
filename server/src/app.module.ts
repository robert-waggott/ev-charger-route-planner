import { Module } from "@nestjs/common";
import { AppController } from "./controllers/app.controller";
import { ConfigController } from "./controllers/config.controller";
import { LocationSearchController } from "./controllers/location-search.controller";
import { AppService } from "./services/app.service";

@Module({
    imports: [],
    controllers: [AppController, ConfigController, LocationSearchController],
    providers: [AppService]
})
export class AppModule {}
