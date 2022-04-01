import { Route } from "./route";

export interface PossibleRoutes {
    routes: Route[] | null;
    from: string;
    to: string;
}
