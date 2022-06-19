export interface ISetStorage {
    set: (key: string, value: string) => Promise<void>
}
