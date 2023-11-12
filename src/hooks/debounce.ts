
type TUseDebounce = (delay: number) => (
    (
        handler: (...params: any) => void
    ) => (
            (...params: any) => void
        )
)

export const useDebounce: TUseDebounce = (delay) => (handler) => {
    let timer: any
    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => handler(...args), delay)
    }
}