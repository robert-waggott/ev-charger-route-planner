import React, { Dispatch, SetStateAction } from "react";
import { FullScreenMap } from "./components/full-screen-map";
import { Sidebar } from "./components/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "./interfaces/route";
import { ChargeDevice } from "./interfaces/charge-points-response";

export type RouteContextDefaultValue = {
    route: Route | null;
    setRoute: Dispatch<SetStateAction<Route | null>>;
};

export type SelectedChargeDeviceContextDefaultValue = {
    chargeDevice: ChargeDevice | null;
    setChargeDevice: Dispatch<SetStateAction<ChargeDevice | null>>;
};

export const RouteContext = React.createContext<RouteContextDefaultValue>({ route: null, setRoute: () => {} });
export const SelectedChargeDeviceContext = React.createContext<SelectedChargeDeviceContextDefaultValue>({
    chargeDevice: null,
    setChargeDevice: () => {}
});

function App() {
    const [route, setRoute] = React.useState<Route | null>(null);
    const [chargeDevice, setChargeDevice] = React.useState<ChargeDevice | null>(null);

    return (
        <div className="App">
            <RouteContext.Provider value={{ route, setRoute }}>
                <SelectedChargeDeviceContext.Provider value={{ chargeDevice, setChargeDevice }}>
                    <Sidebar />
                    <FullScreenMap />
                </SelectedChargeDeviceContext.Provider>
            </RouteContext.Provider>
        </div>
    );
}

export default App;
