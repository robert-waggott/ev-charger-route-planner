import React, { Dispatch, SetStateAction } from "react";

import { FullScreenMap } from "./components/full-screen-map";
import { SearchSidebar } from "./components/sidebar";
import { Route } from "./interfaces/route";
import { Config } from "./interfaces/config";
import { ChargeDevice } from "./interfaces/charge-points-response";
import { ChargeDeviceDetailsSidebar } from "./components/charge-device-details-sidebar";

import "bootstrap/dist/css/bootstrap.min.css";
import { ConfigService } from "./services/config-service";

export type RouteContextDefaultValue = {
    route: Route | null;
    setRoute: Dispatch<SetStateAction<Route | null>>;
};

export type ConfigContextDefaultValue = {
    config: Config | null;
    setConfig: Dispatch<SetStateAction<Config | null>>;
};

export type SelectedChargeDeviceContextDefaultValue = {
    chargeDevice: ChargeDevice | null;
    setChargeDevice: Dispatch<SetStateAction<ChargeDevice | null>>;
};

export const RouteContext = React.createContext<RouteContextDefaultValue>({
    route: null,
    setRoute: () => {}
});
export const ConfigContext = React.createContext<ConfigContextDefaultValue>({
    config: null,
    setConfig: () => {}
});
export const SelectedChargeDeviceContext = React.createContext<SelectedChargeDeviceContextDefaultValue>({
    chargeDevice: null,
    setChargeDevice: () => {}
});

function App() {
    const [route, setRoute] = React.useState<Route | null>(null);
    const [chargeDevice, setChargeDevice] = React.useState<ChargeDevice | null>(null);
    const [config, setConfig] = React.useState<Config | null>(null);

    async function getConfig() {
        const config = await new ConfigService().getConfig(); // todo: make this a constant or app context so can be used in sidebar map too

        setConfig(config);
    }

    React.useEffect(() => {
        getConfig();
    }, []);

    return (
        <div className="App">
            <RouteContext.Provider value={{ route, setRoute }}>
                <SelectedChargeDeviceContext.Provider value={{ chargeDevice, setChargeDevice }}>
                    <ConfigContext.Provider value={{ config, setConfig }}>
                        <SearchSidebar />
                        <FullScreenMap />
                        <ChargeDeviceDetailsSidebar />
                    </ConfigContext.Provider>
                </SelectedChargeDeviceContext.Provider>
            </RouteContext.Provider>
        </div>
    );
}

export default App;
