import React from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
    // getting stored value
    const saved = localStorage.getItem(key);

    if (!saved) {
        return defaultValue;
    }

    return <T>JSON.parse(saved);
}

export function useLocalStorage<T>(key: string, defaultValue?: T | null) {
    const [value, setValue] = React.useState<T | null | undefined>(() => {
        return getStorageValue(key, defaultValue);
    });

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}
