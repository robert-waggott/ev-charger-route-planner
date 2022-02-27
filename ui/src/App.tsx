import React, { Dispatch, SetStateAction } from "react";

import { FullScreenMap } from "./components/full-screen-map";
import { SearchSidebar } from "./components/sidebar";
import { Route } from "./interfaces/route";
import { Config } from "./interfaces/config";
import { ChargeDevice } from "./interfaces/charge-points-response";
import { ChargeDeviceDetailsSidebar } from "./components/charge-device-details-sidebar";
import { ConfigService } from "./services/config-service";

import "bootstrap/dist/css/bootstrap.min.css";
import { AvailableRoutesModal } from "./components/available-routes";

export type ConfigContextDefaultValue = {
    config: Config | null;
    setConfig: Dispatch<SetStateAction<Config | null>>;
};

export const ConfigContext = React.createContext<ConfigContextDefaultValue>({
    config: null,
    setConfig: () => {}
});

function App() {
    const [config, setConfig] = React.useState<Config | null>(null);
    const [selectedRoute, setSelectedRoute] = React.useState<Route | null>(null);
    const [possibleRoutes, setPossibleRoutes] = React.useState<Route[] | null>(null);
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
            <ConfigContext.Provider value={{ config, setConfig }}>
                <SearchSidebar onSearchSubmitted={(possibleRoutes) => setPossibleRoutes(possibleRoutes)} />
                <FullScreenMap route={selectedRoute} onChargeDeviceChanged={(cd) => setSelectedChargeDevice(cd)} />
                <ChargeDeviceDetailsSidebar chargeDevice={selectedChargeDevice} />
                <AvailableRoutesModal possibleRoutes={possibleRoutes} />
            </ConfigContext.Provider>
        </div>
    );
}

export default App;
