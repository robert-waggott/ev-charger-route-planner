import axios from "axios";

export abstract class BaseService {
    port: number;

    constructor() {
        this.port = 3001;
    }

    protected async get(relativeUrl: string) {
        const absoluteUrl = this.buildAbsoluteUrl(relativeUrl);
        const response = await axios.get(absoluteUrl);

        return response.data;
    }

    protected async post(relativeUrl: string, data: any) {
        const absoluteUrl = this.buildAbsoluteUrl(relativeUrl);
        const response = await axios.post(absoluteUrl, data);

        return response.data;
    }

    private buildAbsoluteUrl(relativeUrl: string) {
        return `http://localhost:${this.port}${relativeUrl}`;
    }
}
