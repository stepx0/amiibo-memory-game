import { useEffect, useState } from 'react';
import '../scss/App.scss';
import Header from './Header';
import Board from './Board';
import axios from 'axios';
import { CardModel } from './CardFrame';
import arrayShuffle from 'array-shuffle';
import { v4 as uuidv4 } from 'uuid';

export const enum GameType {
    MarioSportsSuperstars,
    AnimalCrossing,
    Pokemon
}

export const enum Difficulty {
    Easy,
    Medium,
    Advanced
}

export const enum GameStatus {
    Ready,
    Ongoing,
    Completed
}

type AmiiboResponse = {
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

function App() {
    const [amiibos, setAmiibos] = useState<Amiibo[]>([]);
    const [cards, setCards] = useState<CardModel[]>([]);
    const [gameSeries, setGameSeries] = useState<GameType>(GameType.MarioSportsSuperstars);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Ongoing);

    const getAmiibosByGameSeries = async (gameType: GameType) => {
        let param: string

        switch (gameType) {
            case GameType.MarioSportsSuperstars: {
                param = 'Mario Sports Superstars'
                break;
            }
            case GameType.AnimalCrossing: {
                param = 'Animal Crossing'
                break;
            }
            case GameType.Pokemon: {
                param = 'Pokemon'
                break;
            }
        }

        try {
            const res = await axios.get<AmiiboResponse>(`https://amiiboapi.com/api/amiibo/?gameseries=${param}`)
            setAmiibos(res.data.amiibo)
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        console.log('gameseries selected, now ready')
        setGameStatus(GameStatus.Ready)
    }, [gameSeries])

    useEffect(() => {
        console.log('amiibos changed')
        if (amiibos.length > 0) {
            setCards(prepareCards(amiibos, difficulty))
            setGameStatus(GameStatus.Ongoing)
        }
    }, [amiibos, difficulty])

    useEffect(() => {
        if (gameStatus === GameStatus.Ready)
            getAmiibosByGameSeries(gameSeries)
        else if (gameStatus === GameStatus.Completed)
            alert("Completed!!!!")
    }, [gameStatus])

    function prepareCards(amiibos: Amiibo[], difficulty: Difficulty): CardModel[] {
        let numberOfCards = getNumberOfCardsFromDifficulty(difficulty)
        return parseAmiibosToCards(amiibos, numberOfCards);
    }

    function parseAmiibosToCards(amiibos: Amiibo[], numberOfCards: number): CardModel[] {
        if (amiibos.length < numberOfCards) {
            alert("There are not enough cards in this game series!\n\nTry another one please.")
            return [];
        }

        let limitedNumberOfAmiibos = arrayShuffle(amiibos).slice(0, numberOfCards)
        let pairedCards = arrayShuffle([...limitedNumberOfAmiibos, ...limitedNumberOfAmiibos])
        let parsedCards: CardModel[] = pairedCards.map(amiibo => ({
            id: uuidv4(),
            src: amiibo.image,
            name: amiibo.name,
            isMatched: false,
        }))
        return parsedCards;
    }

    function getNumberOfCardsFromDifficulty(difficulty: Difficulty): number {
        switch (difficulty) {
            case Difficulty.Easy:
                return 4;
            case Difficulty.Medium:
                return 6;
            case Difficulty.Advanced:
                return 9;
        }
    }

    return (
        <div className="App-container">
            <Header
                currentSelectedGame={gameSeries}
                currentSelectedDifficulty={difficulty}
                onGameSelected={setGameSeries}
                onNewGameClicked={setGameStatus}
                onDifficultySelected={setDifficulty} />
            <Board cards={cards}
                difficulty={difficulty}
                onGameCompleted={setGameStatus} />
        </div>
    );
}

export default App;