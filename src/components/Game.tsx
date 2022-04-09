import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Amiibo, AmiiboQuery } from '../api/Queries'
import { amiibosToCards } from '../api/Parsers'
import { AMIIBOS_QUERY } from '../api/Queries'
import { Card } from '../components/CardsPresenter'
import Board from './Board'
import CardsPresenter from './CardsPresenter'
import Header from './Header'

export const enum GameSeriesType {
    MarioSportsSuperstars,
    AnimalCrossing,
    Pokemon
}

export const enum Difficulty {
    Easy,
    Medium,
    Advanced
}

export const enum GamePhase {
    Ready,
    Ongoing,
    Completed
}

function Game() {
    const [cards, setCards] = useState<Card[]>([])
    const [gameSeries, setGameSeries] = useState<GameSeriesType>(GameSeriesType.MarioSportsSuperstars)
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy)
    const [gamePhase, setGamePhase] = useState<GamePhase>()


    const [getAmiibos, { loading, data }] = useLazyQuery<AmiiboQuery>(AMIIBOS_QUERY, {
        variables: {
            gameSeries: getParamForAPICall(gameSeries)
        }
    })

    useEffect(() => {
        try {
            parseCards()
        }
        catch (e) {
            console.log(e)
        }
    }, [data])

    function parseCards() {
        let receivedAmiibos = data?.amiibosQuery?.amiibo
            if (receivedAmiibos !== undefined) {
                setCards(
                    CardsPresenter<Amiibo>({
                        items: receivedAmiibos,
                        difficulty: difficulty,
                        setCards: amiibosToCards
                    })
                )
                setGamePhase(GamePhase.Ongoing)
            }
    }


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
            getAmiibos()
        } else if (gamePhase === GamePhase.Completed)
            alert("Congrats, you are a winner!!!")
    }, [gamePhase])

    // reloading game
    useEffect(() => {
        setGamePhase(GamePhase.Ready)
    }, [gameSeries])

    useEffect(() => {
        console.log(gamePhase)
        parseCards()
    }, [difficulty])

    function onNewGameClicked() {
        parseCards()
    }

    return (
        <div className="app-container">
            <Header
                currentSelectedGame={gameSeries}
                currentSelectedDifficulty={difficulty}
                onGameSeriesSelected={setGameSeries}
                onNewGameClicked={onNewGameClicked}
                onDifficultySelected={setDifficulty} />
            <Board cards={cards}
                difficulty={difficulty}
                onGameCompleted={setGamePhase} />
        </div>
    )
}

export default Game

