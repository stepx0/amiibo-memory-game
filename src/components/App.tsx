import { useEffect, useState } from 'react'
import { Difficulty, GamePhase, GameSeriesType, Card } from '../models/models'
import { Amiibo } from '../api/models'
import { getAmiibosByGameSeries } from '../api/AmiiboAPI'
import Header from './Header'
import Board from './Board'
import CardsPresenter from './CardsPresenter'
import { amiibosToCards } from '../api/parsers'

function App() {
    const [amiibos, setAmiibos] = useState<Amiibo[]>([])
    const [cards, setCards] = useState<Card[]>([])
    const [gameSeries, setGameSeries] = useState<GameSeriesType>(GameSeriesType.MarioSportsSuperstars)
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy)
    const [gamePhase, setGamePhase] = useState<GamePhase>()


    // reloading game
    useEffect(() => {
        console.log(1)
        setGamePhase(GamePhase.Ready)
    }, [gameSeries, difficulty])

    // new amiibos received from api
    useEffect(() => {
        console.log(3)
        if (amiibos.length > 0) {
            console.log(3, "vero")
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

    // game phase changed
    useEffect(() => {
        if (gamePhase === GamePhase.Ready) {
            console.log(2)
            getAmiibosByGameSeries(
                getParamForAPICall(gameSeries),
                setAmiibos
            )
        }
        else if (gamePhase === GamePhase.Completed) {
            console.log("last")
            alert("Congrats, you are a winner!!!")
        }
    }, [gamePhase])


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