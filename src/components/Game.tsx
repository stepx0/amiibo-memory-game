import { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client';
import { Amiibo } from '../api/models'
import { amiibosToCards } from '../api/parsers'
import { AMIIBOS_QUERY } from '../api/queries'
import { Card, Difficulty, GamePhase, GameSeriesType } from '../models/models'
import Board from './Board'
import CardsPresenter from './CardsPresenter'
import Header from './Header'


function Game() {
    const [cards, setCards] = useState<Card[]>([])
    const [gameSeries, setGameSeries] = useState<GameSeriesType>(GameSeriesType.MarioSportsSuperstars)
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy)
    const [gamePhase, setGamePhase] = useState<GamePhase>()

     
     const [getAmiibos, { loading, data }] = useLazyQuery<Amiibo[]>(AMIIBOS_QUERY, {
        variables: {
            gameSeries: getParamForAPICall(gameSeries)
        }
    })

    useEffect(() => {
        console.log("query used!", data)
        if(data !== undefined) {
            console.log("data exists", data)
            if (data.length > 0) {
                setCards(
                    CardsPresenter<Amiibo>({
                        items: data,
                        difficulty: difficulty,
                        setCards: amiibosToCards
                    })
                )
                setGamePhase(GamePhase.Ongoing)
            }
        } 
            
    }, [data])

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
 
    // game phase management
    useEffect(() => {
        if (gamePhase === GamePhase.Ready) {
            /* ApiCaller({
                gameSeries: gameSeries,
                callback: setAmiibos
            }) */
            /* apolloCli.queryData({
                gameSeries: gameSeries,
                callback: setAmiibos
            }) */
            /* ApolloCli({
                gameSeries: gameSeries,
                callback: setAmiibos
            }) */
            getAmiibos()
        } else if (gamePhase === GamePhase.Completed)
            alert("Congrats, you are a winner!!!")
    }, [gamePhase])

    // reloading game
    useEffect(() => {
        setGamePhase(GamePhase.Ready)
    }, [gameSeries, difficulty])


    return (
        <div className="App-container">
            <Header
                currentSelectedGame={gameSeries}
                currentSelectedDifficulty={difficulty}
                onGameSeriesSelected={setGameSeries}
                onNewGameClicked={setGamePhase}
                onDifficultySelected={setDifficulty} />
            <Board cards={cards}
                difficulty={difficulty}
                onGameCompleted={setGamePhase} />
        </div>
    )
}

export default Game

