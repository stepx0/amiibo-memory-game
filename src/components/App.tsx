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
    const [cards, setCards] = useState<CardModel[]>([]);
    const [gameSeries, setGameSeries] = useState<GameType>(GameType.MarioSportsSuperstars);

    const getAmiibosByGameSeries = async (gameType: GameType) => {
        console.log("getApiSeries")

        let param: string = '';

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
            let amiiboCards = parseAmiibosToCards(res.data.amiibo)
            setCards(amiiboCards)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log("usedEffectSeries")
        getAmiibosByGameSeries(gameSeries)
    }, [gameSeries])

    function parseAmiibosToCards(amiibos: Amiibo[]): CardModel[] {
        let limitedNumberOfAmiibos = arrayShuffle(amiibos).slice(0, 6)
        //todo: check if there is at least 6 cards, otherwise pop up an error
        let pairedCards = arrayShuffle([...limitedNumberOfAmiibos, ...limitedNumberOfAmiibos])
        let parsedCards: CardModel[] = pairedCards.map(amiibo => ({
            id: uuidv4(),
            src: amiibo.image,
            name: amiibo.name,
            isMatched: false,
        }))
        return parsedCards;
    }

    return (
        <div className="App-container">
            <Header onGameSelected={setGameSeries} />
            <Board cards={cards} />
        </div>
    );
}

export default App;