import {
    LngLatBounds,
    LngLatLike,
    Map,
    MapboxGeoJSONFeature,
    MapLayerMouseEvent,
    MapMouseEvent,
    Popup
} from "maplibre-gl";
import { Route } from "../interfaces/route";
import { Feature, Point, Position } from "geojson";
import { ChargingPointsService } from "./charging-points-service";
import { ChargeDevice, ChargeDeviceLocation } from "../interfaces/charge-points-response";

export class RouteBuildingService {
    chargingPointsService: ChargingPointsService;

    constructor(
        private route: Route,
        private map: Map,
        private chargeDeviceSelectedCallback: (chargeDevice: ChargeDevice | null) => unknown
    ) {
        this.chargingPointsService = new ChargingPointsService();
    }

    public async mapRoute() {
        const image = await this.loadChargingStationImage();

        if (!this.map.hasImage("ev-icon")) {
            this.map.addImage("ev-icon", image);
        }

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

        await this.mapPoint(this.route.geometry.coordinates[0], "start-point");
        await this.mapPoint(this.route.geometry.coordinates[this.route.geometry.coordinates.length - 1], "end-point");

        this.fitBounds();
    }

    private async mapPoint(coord: Position, id: string) {
        if (this.map.getLayer(id)) {
            this.map.removeLayer(id);
        }

        if (this.map.getSource(id)) {
            this.map.removeSource(id);
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

        const nearbyChargingPointsID = `${id}-nearby-charging-points`;

        if (this.map.getLayer(nearbyChargingPointsID)) {
            this.map.removeLayer(nearbyChargingPointsID);
        }

        if (this.map.getSource(nearbyChargingPointsID)) {
            this.map.removeSource(nearbyChargingPointsID);
        }

        this.map.addSource(nearbyChargingPointsID, {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: nearbyChargingPoints.map(
                    (chargingPoint) =>
                        ({
                            type: "Feature",
                            properties: chargingPoint,
                            geometry: {
                                type: "Point",
                                coordinates: [
                                    chargingPoint.ChargeDeviceLocation.Longitude,
                                    chargingPoint.ChargeDeviceLocation.Latitude
                                ]
                            }
                        } as Feature<Point, ChargeDevice>)
                )
            }
        });

        this.map.addLayer({
            id: nearbyChargingPointsID,
            type: "symbol",
            source: nearbyChargingPointsID,
            layout: {
                "icon-image": "ev-icon",
                "icon-size": 0.75
            }
        });

        this.map.on("click", nearbyChargingPointsID, (e: MapLayerMouseEvent) => {
            if (!e.features) {
                return;
            }

            // todo - refactor this:
            const props = e.features[0].properties!;
            const chargeStation = props as ChargeDevice;

            chargeStation.ChargeDeviceLocation = JSON.parse(props.ChargeDeviceLocation);
            chargeStation.Connector = JSON.parse(props.Connector);
            chargeStation.DeviceOwner = JSON.parse(props.DeviceOwner);
            chargeStation.DeviceController = JSON.parse(props.DeviceController);

            this.chargeDeviceSelectedCallback(chargeStation);
        });

        this.map.on("mouseenter", nearbyChargingPointsID, () => {
            this.map.getCanvas().style.cursor = "pointer";
        });

        this.map.on("mouseleave", nearbyChargingPointsID, () => {
            this.map.getCanvas().style.cursor = "";
        });
    }

    private loadChargingStationImage(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.map.loadImage("/charging-station.png", (error: string, image: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(image);
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
