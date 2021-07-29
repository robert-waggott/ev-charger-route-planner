import axios from "axios";
import { useEffect, useState } from "react";
import { NullableConfig } from "../interfaces/config";
import { ConfigService } from "../services/config-service";

export interface FullScreenMapProps {}

export const FullScreenMap = (props: FullScreenMapProps) => {
    const [config, setConfig] = useState<NullableConfig>(null);

    async function getConfig() {
        const config = await new ConfigService().getConfig();

        setConfig(config);
    }

    useEffect(() => {
        getConfig();
    }, []);

    useEffect(() => {
        if (config) {
        }
    }, [config]);

    return <></>;
};
