import React from "react";

export function getLocalStorageValue<T>(key: string, defaultValue: T) {
    const saved = localStorage.getItem(key);

    if (!saved || saved === "undefined") {
        return defaultValue;
    }

    return JSON.parse(saved) as T;
}

export function setLocalStorageValue<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage<T>(key: string, defaultValue?: T | null) {
    const [value, setValue] = React.useState<T | null | undefined>(() => {
        return getLocalStorageValue(key, defaultValue);
    });

    React.useEffect(() => {
        setLocalStorageValue(key, value);
    }, [key, value]);

    return [value, setValue] as const;
}
