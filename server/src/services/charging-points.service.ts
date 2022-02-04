// https://chargepoints.dft.gov.uk/api/retrieve/registry/format/json/lat/51.978104/long/-0.227205/limit/10/dist/1

import { Injectable } from "@nestjs/common";
import axios from "axios";
import { LatLng } from "src/dtos/lat-lng.dto";
import { ChargeDevice } from "src/interfaces/charge-points-response.interface";

@Injectable()
export class ChargingPointsService {
    async getChargingPoints(latLng: LatLng): Promise<ChargeDevice[]> {
        // top 10, 3 mile radius of the lat/lng
        const url = `https://chargepoints.dft.gov.uk/api/retrieve/registry/format/json/lat/${latLng.lat}/long/${latLng.lng}/limit/10/dist/3`;

        const response = await axios.get(url);

        return response.data.ChargeDevice.filter((chargeDevice) => chargeDevice.DateDeleted === "n/a");
    }
}
