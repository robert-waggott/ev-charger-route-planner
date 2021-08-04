import React, { Dispatch, SetStateAction } from "react";
import { FullScreenMap } from "./components/full-screen-map";
import { Sidebar } from "./components/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "./interfaces/route";

export type RouteContextDefaultValue = {
    route: Route | null;
    setRoute: Dispatch<SetStateAction<Route | null>>;
};

export const RouteContext = React.createContext<RouteContextDefaultValue>({ route: null, setRoute: () => {} });

function App() {
    const [route, setRoute] = React.useState<Route | null>(null);

    return (
        <div className="App">
            <RouteContext.Provider value={{ route, setRoute }}>
                <Sidebar />
                <FullScreenMap />
            </RouteContext.Provider>
        </div>
    );
}

export default App;
