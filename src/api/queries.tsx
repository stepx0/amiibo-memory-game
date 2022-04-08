import { gql } from '@apollo/client';

export const AMIIBOS_QUERY = gql`
query ($gameSeries: String!) {
    amiibo(gameSeries: $gameSeries) @rest(path: "amiibo/?gameseries={args.gameSeries}") {
        amiibo {
            name,
            image,
            gameSeries
        }
    }
}
`