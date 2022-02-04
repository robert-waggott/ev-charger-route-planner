import { Controller, Get, Param } from "@nestjs/common";
import { ChargeDevice } from "src/interfaces/charge-points-response.interface";
import { ChargingPointsService } from "src/services/charging-points.service";

@Controller("ChargingPoints")
export class ChargingPointsController {
    constructor(private chargingPointsService: ChargingPointsService) {}

    @Get("/lat/:lat/lng/:lng")
    async getChargingPoints(@Param("lat") lat: number, @Param("lng") lng: number): Promise<ChargeDevice[]> {
        return await this.chargingPointsService.getChargingPoints({ lat: lat, lng: lng });
    }
}
