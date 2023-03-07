import { useCallback } from "react"

export const useMessage = () => {
    return useCallback(text => {
        // M === materialize
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])
}