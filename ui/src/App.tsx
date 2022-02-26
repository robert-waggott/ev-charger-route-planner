import React, { Dispatch, SetStateAction } from "react";

import { FullScreenMap } from "./components/full-screen-map";
import { SearchSidebar } from "./components/sidebar";
import { Route } from "./interfaces/route";
import { Config } from "./interfaces/config";
import { ChargeDevice } from "./interfaces/charge-points-response";
import { ChargeDeviceDetailsSidebar } from "./components/charge-device-details-sidebar";
import { ConfigService } from "./services/config-service";

import "bootstrap/dist/css/bootstrap.min.css";

export type RouteContextDefaultValue = {
    route: Route | null;
    setRoute: Dispatch<SetStateAction<Route | null>>;
};

export type ConfigContextDefaultValue = {
    config: Config | null;
    setConfig: Dispatch<SetStateAction<Config | null>>;
};

export const RouteContext = React.createContext<RouteContextDefaultValue>({
    route: null,
    setRoute: () => {}
});
export const ConfigContext = React.createContext<ConfigContextDefaultValue>({
    config: null,
    setConfig: () => {}
});

function App() {
    const [route, setRoute] = React.useState<Route | null>(null);
    const [config, setConfig] = React.useState<Config | null>(null);
    const [selectedChargeDevice, setSelectedChargeDevice] = React.useState<ChargeDevice | null>(null);

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
                <ConfigContext.Provider value={{ config, setConfig }}>
                    <SearchSidebar />
                    <FullScreenMap onChargeDeviceChanged={(cd) => setSelectedChargeDevice(cd)} />
                    <ChargeDeviceDetailsSidebar chargeDevice={selectedChargeDevice} />
                </ConfigContext.Provider>
            </RouteContext.Provider>
        </div>
    );
}

export default App;
