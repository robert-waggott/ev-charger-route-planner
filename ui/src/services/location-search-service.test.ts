import { LocationSearchResponse } from "../interfaces/search-result";
import { LocationSearchService } from "./location-search-service";
import { faker } from "@faker-js/faker";
import nock from "nock";

let interceptor: nock.Interceptor;

beforeEach(() => {
    interceptor = nock("http://localhost:3001")
        .defaultReplyHeaders({
            "access-control-allow-origin": "*",
            "access-control-allow-credentials": "true"
        })
        .post("/LocationSearch");
});

afterEach(() => nock.cleanAll());

test("api is called with the correct body", async () => {
    const locationSearchService = new LocationSearchService();
    const searchTerm = faker.address.city();

    interceptor.reply(200, (uri, requestBody: Record<string, any>) => {
        expect(requestBody.searchTerm).toBe(searchTerm);

        return null;
    });

    await locationSearchService.performSearch(searchTerm);
});

test("returns the unaltered response from the api", async () => {
    const locationSearchService = new LocationSearchService();
    const expectedResponse: LocationSearchResponse = {
        attribution: faker.lorem.sentence(),
        results: [
            {
                name: faker.address.city(),
                description: faker.lorem.paragraph(),
                center: {
                    lat: faker.datatype.float(),
                    lng: faker.datatype.float()
                },
                relevance: faker.datatype.number()
            }
        ]
    };

    interceptor.reply(200, expectedResponse);

    const response = await locationSearchService.performSearch(faker.address.city());

    expect(response).toEqual(expectedResponse);
});
