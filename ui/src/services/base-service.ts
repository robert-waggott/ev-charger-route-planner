import axios from "axios";

export abstract class BaseService {
    protected async get(relativeUrl: string) {
        const absoluteUrl = `http://localhost:3001/${relativeUrl}`;
        const response = await axios.get(absoluteUrl);

        return response.data;
    }
}
