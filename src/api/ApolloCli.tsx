import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GameSeriesType } from '../models/models';
import { Amiibo } from './models';
import { AMIIBOS_QUERY } from './queries';

type ApolloCliProps = {
    gameSeries: GameSeriesType,
    callback: (data: Amiibo[]) => void
}

const ApolloCli = (props: ApolloCliProps) => {
    // Set `RestLink` with your endpoint
    
    const { error, loading, data } = useQuery<Amiibo[]>(AMIIBOS_QUERY, {
        variables: {
            gameSeries: getParamForAPICall(props.gameSeries)
        }
    })

    useEffect(() => {
        console.log(data)
        if(data !== undefined) {
            props.callback(data)
        } else {
            alert("Oops, cand't load cards at the moment...")
        }
            
            
    }, [data])
    
    // Invoke the query and log the person's name
    /* client.query({
        query: AMIIBOS_QUERY,
        variables: {
            gameSeries: getParamForAPICall(props.gameSeries)
        }
    }).then(response => {
        console.log(response.data.amiibo);
        props.callback(response.data.amiibo);
    }).catch(err => {
        //todo: show error message
    }); */

    function getParamForAPICall(gameType: GameSeriesType): string {
        switch (gameType) {
            case GameSeriesType.MarioSportsSuperstars: {
                return 'Mario Sports Superstars'
            }
            case GameSeriesType.AnimalCrossing: {
                return 'Animal Crossing'
            }
            case GameSeriesType.Pokemon: {
                return 'Pokemon'
            }
        }
    }
}



/* const { loading, error, data } = useQuery(aQuery, {
    variables: {},
    context: { clientName: 'rest' }
})

if (loading) return 'Loading...';
if (error) return 'No results found';
console.log(data); */

export default ApolloCli
