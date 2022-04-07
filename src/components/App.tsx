import { useEffect, useState } from 'react'
import { Difficulty, GamePhase, GameSeriesType, Card } from '../models/models'
import { Amiibo } from '../api/models'
import { getAmiibosByGameSeries } from '../api/AmiiboAPI'
import Header from './Header'
import Board from './Board'
import CardsPresenter from './helpers/CardsPresenter'
import { amiibosToCards } from '../api/parsers'
import ApiCaller from './helpers/ApiCaller'

const App = () => {
    const [amiibos, setAmiibos] = useState<Amiibo[]>([])
    const [cards, setCards] = useState<Card[]>([])
    const [gameSeries, setGameSeries] = useState<GameSeriesType>(GameSeriesType.MarioSportsSuperstars)
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy)
    const [gamePhase, setGamePhase] = useState<GamePhase>()


    // reloading game
    useEffect(() => {
        setGamePhase(GamePhase.Ready)
    }, [gameSeries, difficulty])

    // new amiibos received from api
    useEffect(() => {
        if (amiibos.length > 0) {
            setCards(
                CardsPresenter<Amiibo>({
                    items: amiibos,
                    difficulty: difficulty,
                    setCards: amiibosToCards
                })
            )
            setGamePhase(GamePhase.Ongoing)
        }
    }, [amiibos])

    // game phase management
    useEffect(() => {
        if (gamePhase === GamePhase.Ready) {
            ApiCaller({
                gameSeries: gameSeries,
                callback: setAmiibos
            })
        } else if (gamePhase === GamePhase.Completed)
            alert("Congrats, you are a winner!!!")
    }, [gamePhase])


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

export default App