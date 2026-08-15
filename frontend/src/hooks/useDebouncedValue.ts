import { useState, useEffect } from 'react';

export function useDebouncedValue(searchTerm: string, time: number) {
    const [debouncedValue, setDebouncedValue] = useState(searchTerm);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
           setDebouncedValue(searchTerm);
        }, time);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm, time]);

    return debouncedValue;
}
