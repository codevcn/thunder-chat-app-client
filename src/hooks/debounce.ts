export const useDebounce = (delay: number) => (handler: (...params: any) => void) => {
    let timer: any
    return (...args: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => handler(...args), delay)
    }
}
