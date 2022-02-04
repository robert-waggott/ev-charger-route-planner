// https://chargepoints.dft.gov.uk/api/retrieve/registry/format/json/lat/51.978104/long/-0.227205/limit/10/dist/1

import axios from "axios";
import { LatLng } from "../interfaces/lat-lng";
import { ChargeDevice, ChargePointsResponse } from "../interfaces/charge-points-response";
import { BaseService } from "./base-service";

export class ChargingPointsService extends BaseService {
    async getChargingPoints(latLng: LatLng): Promise<ChargeDevice[]> {
        const response = await axios.get<ChargePointsResponse>(
            `https://chargepoints.dft.gov.uk/api/retrieve/registry/format/json/lat/${latLng.lat}/long/${latLng.lng}/limit/10/dist/1`
        );

        return response.data.ChargeDevice.filter((chargeDevice) => chargeDevice.DateDeleted === "n/a");
    }
}
