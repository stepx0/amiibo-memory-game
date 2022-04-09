import { gql } from '@apollo/client'

export type AmiiboQuery = {
    amiibosQuery: AmiiboResponse
}

export type AmiiboResponse = {
    amiibo: Amiibo[]
}

export type Amiibo = {
    name: string,
    image: string,
    gameSeries: string
}

export const AMIIBOS_QUERY = gql`
query ($gameSeries: String!) {
    amiibosQuery(gameSeries: $gameSeries) @rest(path: "amiibo/?gameseries={args.gameSeries}") {
        amiibo {
            name,
            image,
            gameSeries
        }
    }
}
`