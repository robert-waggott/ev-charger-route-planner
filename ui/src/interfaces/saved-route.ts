import moment from "moment";

import { Route } from "./route";

export interface SavedRoute {
    name: string;
    comments?: string | null;
    savedOn: moment.MomentInput;
    route: Route;
}
