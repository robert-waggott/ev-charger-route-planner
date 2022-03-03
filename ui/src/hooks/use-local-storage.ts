import React from "react";

function getLocalStorageValue<T>(key: string, defaultValue: T) {
    const saved = localStorage.getItem(key);

    if (!saved) {
        return defaultValue;
    }

    return <T>JSON.parse(saved);
}

export function useLocalStorage<T>(key: string, defaultValue?: T | null) {
    const [value, setValue] = React.useState<T | null | undefined>(() => {
        return getLocalStorageValue(key, defaultValue);
    });

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}
