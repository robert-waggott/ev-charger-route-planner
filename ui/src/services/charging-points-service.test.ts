import { LocationSearchResponse } from "../interfaces/search-result";
import { ChargingPointsService } from "./charging-points-service";
import { faker } from "@faker-js/faker";
import nock from "nock";

let scope: nock.Scope;

beforeEach(() => {
    scope = nock("http://localhost:3001").defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true"
    });
});

afterEach(() => nock.cleanAll());

test("api is called with the correct request", async () => {
    const chargingPointsService = new ChargingPointsService();
    const latLng = {
        lat: faker.datatype.float(),
        lng: faker.datatype.float()
    };

    scope
        .get((uri: string) => {
            expect(uri).toBe(`/ChargingPoints/lat/${latLng.lat}/lng/${latLng.lng}`);
            return true;
        })
        .reply(200, {});

    await chargingPointsService.getChargingPoints(latLng);
});

test("returns the unaltered response from the api", async () => {
    const chargingPointsService = new ChargingPointsService();
    const expectedResponse = {};

    scope.get(() => true).reply(200, expectedResponse);

    const response = await chargingPointsService.getChargingPoints({
        lat: faker.datatype.float(),
        lng: faker.datatype.float()
    });

    expect(response).toEqual(expectedResponse);
});
