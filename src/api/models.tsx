export type AmiiboResponse = {
    amiibo: Amiibo[]
}

export type Amiibo = {
    amiiboSeries: string,
    character: string,
    gameSeries: string,
    head: string,
    image: string,
    name: string,
    tail: string,
    type: String
}