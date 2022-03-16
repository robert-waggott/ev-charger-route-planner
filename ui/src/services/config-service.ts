import { plainToInstance } from "class-transformer";

import { Config } from "../classes/config";
import { BaseService } from "./base-service";

export class ConfigService extends BaseService {
    async getConfig(): Promise<Config> {
        const response = await this.get("/config");

        return plainToInstance(Config, response);
    }
}
