import { useEffect, useState } from 'react'
import { Difficulty, GamePhase, GameSeriesType, Card } from '../models/models'
import { Amiibo } from '../api/models'
import { getAmiibosByGameSeries } from '../api/AmiiboAPI'
import arrayShuffle from 'array-shuffle'
import { v4 as uuidv4 } from 'uuid'
import Header from './Header'
import Board from './Board'

function App() {
    const [amiibos, setAmiibos] = useState<Amiibo[]>([])
    const [cards, setCards] = useState<Card[]>([])
    const [gameSeries, setGameSeries] = useState<GameSeriesType>(GameSeriesType.MarioSportsSuperstars)
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy)
    const [gamePhase, setGamePhase] = useState<GamePhase>()


    // reloading game
    useEffect(() => {
        setGamePhase(GamePhase.Ready)
    }, [gameSeries, difficulty])

    // new amiibos received from api || difficulty changed
    useEffect(() => {
        console.log(3)
        if (amiibos.length > 0) {
            console.log(3, "vero")
            setCards(prepareCards(amiibos, difficulty))
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


    // starting game
    function prepareCards(amiibos: Amiibo[], difficulty: Difficulty): Card[] {
        return parseAmiibosToCards(
            amiibos,
            getCardsNumber(difficulty)
        )
    }

    function parseAmiibosToCards(amiibos: Amiibo[], numberOfCards: number): Card[] {
        let pairedCards = sliceReceivedData(amiibos, numberOfCards)
        let parsedCards: Card[] = pairedCards.map(amiibo => ({
            id: uuidv4(),
            src: amiibo.image,
            name: amiibo.name,
            isMatched: false,
        }))
        return parsedCards
    }

    function sliceReceivedData<T>(data: T[], numberOfCards: number): T[] {
        if (data.length < numberOfCards) {
            alert("There are not enough cards in this game series!\n\nTry another one please.")
            return []
        }
        let slicedData: T[] = arrayShuffle(data).slice(0, numberOfCards)
        return arrayShuffle([...slicedData, ...slicedData])
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

    function getCardsNumber(difficulty: Difficulty): number {
        switch (difficulty) {
            case Difficulty.Easy:
                return 4
            case Difficulty.Medium:
                return 6
            case Difficulty.Advanced:
                return 9
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