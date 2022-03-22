export class Config {
    MapTilerAPIKey!: string;
    TileOption: TileOption = TileOption.Streets;

    get mapTilerURL() {
        return this.buildMapTilerURL(TileOption[this.TileOption]);
    }

    buildMapTilerURL(tileOption: string) {
        return `https://api.maptiler.com/maps/${tileOption.toLowerCase()}/style.json?key=${this.MapTilerAPIKey}`;
    }
}

export enum TileOption {
    Basic,
    Bright,
    OpenStreetMap,
    Outdoor,
    Pastel,
    Streets,
    Toner,
    Topo,
    Voyager,
    Winter
}

export type NullableConfig = Config | null;
