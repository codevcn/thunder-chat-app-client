export const getPathnameWithQueryString = (url: string = window.location.href): string => {
    const urlObject = new URL(url)
    return urlObject.pathname + urlObject.search
}
