import mockAxios from "jest-mock-axios";
import { ChargingPointsService } from "./charging-points-service";

afterEach(() => mockAxios.reset());

test("Calls the expected api endpoint with the passed in lat/lng", async () => {
    const service = new ChargingPointsService();
    const latLng = { lat: 0, lng: 1 };
    // todo: refactor to use https://www.npmjs.com/package/axios-mock-adapter
    mockAxios.mockResponse({
        data: []
    });

    await service.getChargingPoints(latLng);

    expect(mockAxios.get).toHaveBeenCalled();
});
