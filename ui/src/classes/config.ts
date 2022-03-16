export class Config {
    MapTilerAPIKey!: string;
    TileOption: TileOption = TileOption.Streets;

    get mapTilerURL() {
        const tileOption = TileOption[this.TileOption].toLowerCase();

        return `https://api.maptiler.com/maps/${tileOption}/style.json?key=${this.MapTilerAPIKey}`;
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
