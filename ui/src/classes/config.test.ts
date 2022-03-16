import { Config, TileOption } from "./config";
import { faker } from "@faker-js/faker";

test("mapTilerURL returns the expected URL", () => {
    const config = new Config();
    const key = faker.datatype.uuid();

    config.MapTilerAPIKey = key;
    config.TileOption = TileOption.Basic;

    expect(config.mapTilerURL).toBe(`https://api.maptiler.com/maps/basic/style.json?key=${key}`);
});
