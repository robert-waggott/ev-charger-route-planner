import { Controller, Get } from "@nestjs/common";
import { Config } from "src/interfaces/config.interface";

@Controller("Config")
export class ConfigController {
    @Get()
    getConfig(): Config {
        return {
            MapTilerAPIKey: process.env.MAPTILERAPIKEY
        };
    }
}
