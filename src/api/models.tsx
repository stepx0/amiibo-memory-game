export type AmiiboResponse = {
    amiibo: Amiibo[]
}

export type Amiibo = {
    name: string,
    image: string,
    gameSeries: string
}