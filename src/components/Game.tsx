import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { amiibosToCards } from 'api/Parsers'
import { Amiibo, AmiiboQuery, AMIIBOS_QUERY } from 'api/Queries'
import { Card } from 'components/CardsPresenter'
import Board from 'components/Board'
import CardsPresenter from 'components/CardsPresenter'
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

    const [getAmiibos, { data }] = useLazyQuery<AmiiboQuery>(AMIIBOS_QUERY, {
        variables: {
            gameSeries: getParamForAPICall(gameSeries)
        }
    })

    // get cards from query
    useEffect(() => {
        try {
            getCardsToDisplay()
        } catch (e) {
            console.log(e)
            alert("Oops, there's something wrong with cards... please try again later.")
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
        if (gamePhase === GamePhase.Ready)
            getAmiibos()
        else if (gamePhase === GamePhase.Completed)
            alert("Congrats, you are a winner!")
    }, [gamePhase])

    // to query new amiibos
    useEffect(() => {
        setGamePhase(GamePhase.Ready)
    }, [gameSeries])


    useEffect(() => {
        getCardsToDisplay()
    }, [difficulty])

    // get cards from presenter
    function getCardsToDisplay() {
        let queriedAmiibos = data?.amiibosQuery?.amiibo
        if (queriedAmiibos !== undefined) {
            setCards(
                CardsPresenter<Amiibo>({
                    items: queriedAmiibos,
                    difficulty: difficulty,
                    setCards: amiibosToCards
                })
            )
            setGamePhase(GamePhase.Ongoing)
        }
    }

    return (
        <div className="app-container">
            <Header
                currentSelectedGame={gameSeries}
                currentSelectedDifficulty={difficulty}
                onGameSeriesSelected={setGameSeries}
                onNewGameClicked={getCardsToDisplay}
                onDifficultySelected={setDifficulty} />
            <Board cards={cards}
                difficulty={difficulty}
                onGameCompleted={setGamePhase} />
        </div>
    )
}

export default Game
