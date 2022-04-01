import { Route } from "../classes/route";

export interface PossibleRoutes {
    routes: Route[] | null;
    from: string;
    to: string;
}
