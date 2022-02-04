import { LatLng } from "../interfaces/lat-lng";
import { ChargeDevice } from "../interfaces/charge-points-response";
import { BaseService } from "./base-service";

export class ChargingPointsService extends BaseService {
    async getChargingPoints(latLng: LatLng): Promise<ChargeDevice[]> {
        const response = await this.get(`/ChargingPoints/lat/${latLng.lat}/lng/${latLng.lng}`);

        return response as ChargeDevice[];
    }
}
