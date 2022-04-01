import moment from "moment";

import { Route } from "../classes/route";

export interface SavedRoute {
    name: string;
    comments?: string | null;
    savedOn: moment.MomentInput;
    route: Route;
}
