export const makeApiUrl = (endpoint: string): string => {
    return `${process.env.API_URL}${endpoint}`
}
