import { LngLatBounds, LngLatLike, Map } from "maplibre-gl";
import { Route } from "../interfaces/route";
import { Point } from "geojson";

export class RouteBuildingService {
    constructor(private route: Route, private map: Map) {}
    public mapRoute() {
        if (this.map.getLayer("route")) {
            this.map.removeLayer("route");
        }

        if (this.map.getSource("route")) {
            this.map.removeSource("route");
        }

        if (this.map.getSource("start-point")) {
            this.map.removeSource("start-point");
        }

        if (this.map.getSource("end-point")) {
            this.map.removeSource("end-point");
        }

        this.map.addSource("route", {
            type: "geojson",
            data: this.route.geometry as any
        });

        this.map.addSource("start-point", {
            type: "geojson",
            data: {
                type: "Point",
                coordinates: this.route.geometry.coordinates[0]
            } as any
        });

        this.map.addSource("end-point", {
            type: "geojson",
            data: {
                type: "Point",
                coordinates: this.route.geometry.coordinates[this.route.geometry.coordinates.length - 1]
            } as any
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

        this.fitBounds();
    }

    private fitBounds() {
        const bounds = new LngLatBounds();

        this.route.geometry.coordinates.forEach((coord) => {
            bounds.extend([coord[0], coord[1]] as LngLatLike);
        });

        this.map.fitBounds(bounds, { padding: 30 });
    }
}
