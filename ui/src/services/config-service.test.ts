import { ConfigService } from "./config-service";
import { faker } from "@faker-js/faker";
import nock from "nock";

const configResponse = {
    MapTilerAPIKey: faker.datatype.uuid()
};

beforeEach(() => {
    nock("http://localhost:3001")
        .defaultReplyHeaders({
            "access-control-allow-origin": "*",
            "access-control-allow-credentials": "true"
        })
        .get("/config")
        .reply(200, configResponse);
});

test("config instance to be built from the expected response", async () => {
    const configService = new ConfigService();

    const config = await configService.getConfig();

    expect(config.MapTilerAPIKey).toBe(configResponse.MapTilerAPIKey);
});
