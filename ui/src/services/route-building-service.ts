import { LngLatBounds, LngLatLike, Map } from "maplibre-gl";
import { Route } from "../interfaces/route";
import { Point, Position } from "geojson";
import { ChargingPointsService } from "./charging-points-service";

export class RouteBuildingService {
    chargingPointsService: ChargingPointsService;

    constructor(private route: Route, private map: Map) {
        this.chargingPointsService = new ChargingPointsService();
    }

    public mapRoute() {
        if (this.map.getLayer("route")) {
            this.map.removeLayer("route");
        }

        if (this.map.getSource("route")) {
            this.map.removeSource("route");
        }

        this.map.addSource("route", {
            type: "geojson",
            data: this.route.geometry as any
        });

        this.map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#228C22",
                "line-width": 5,
                "line-dasharray": [1, 2]
            }
        });

        this.mapPoint(this.route.geometry.coordinates[0], "start-point");
        this.mapPoint(this.route.geometry.coordinates[this.route.geometry.coordinates.length - 1], "end-point");

        this.fitBounds();
    }

    private async mapPoint(coord: Position, id: string) {
        if (this.map.getLayer(id)) {
            this.map.removeLayer(id);
        }

        if (this.map.getSource(id)) {
            this.map.removeSource(id);
        }

        const nearbyChargingPointsID = `${id}-nearby-charging-points`;

        if (this.map.getSource(nearbyChargingPointsID)) {
            this.map.removeSource(nearbyChargingPointsID);
        }

        this.map.addSource(id, {
            type: "geojson",
            data: {
                type: "Point",
                coordinates: coord
            } as any
        });

        this.map.addLayer({
            id: id,
            type: "circle",
            source: id,
            paint: {
                "circle-radius": 12,
                "circle-color": "#228C22"
            }
        });

        const nearbyChargingPoints = await this.chargingPointsService.getChargingPoints({
            lat: coord[1],
            lng: coord[0]
        });

        this.map.addSource(nearbyChargingPointsID, {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: nearbyChargingPoints.map((chargingPoint) => ({
                    type: "Feature",
                    properties: chargingPoint,
                    geometry: {
                        type: "Point",
                        coordinates: [
                            chargingPoint.ChargeDeviceLocation.Longitude,
                            chargingPoint.ChargeDeviceLocation.Latitude
                        ]
                    }
                }))
            }
        });

        this.map.loadImage("", (error: string, image: any) => {
            this.map.addImage("ev-icon", image);

            this.map.addLayer({
                id: nearbyChargingPointsID,
                type: "symbol",
                source: nearbyChargingPointsID,
                paint: {
                    "circle-radius": 12,
                    "circle-color": "#228C22"
                }
            });
        });
    }

    private fitBounds() {
        const bounds = new LngLatBounds();

        this.route.geometry.coordinates.forEach((coord) => {
            bounds.extend([coord[0], coord[1]] as LngLatLike);
        });

        this.map.fitBounds(bounds, { padding: 30 });
    }
}