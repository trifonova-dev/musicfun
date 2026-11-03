import {useEffect, useState} from "react";

export const useDebounceValue = <T>(value: T, delay: number = 700): T => {
    const [debouced, setDebouced] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => setDebouced(value), delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return debouced
}