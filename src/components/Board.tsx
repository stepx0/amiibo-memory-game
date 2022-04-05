import { useEffect, useRef, useState } from 'react'
import CardFrame, { CardModel } from './CardFrame'
import '../scss/board.scss'



type BoardProps = {
    cards: CardModel[]
}

function Board(props: BoardProps) {
    const [cards, setCards] = useState<CardModel[]>();
    const [turns, setTurns] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<CardModel | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<CardModel | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

    
    const startGame = () => {
        setCards(props.cards);
        console.log(props.cards)

        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
    }

    const handleChoice = (card: CardModel) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

     // start the game
     useEffect(() => {
        console.log("startGame")
        startGame();
     }, [])

    // compare selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards?.map(card => {
                        if (card.src === choiceOne.src)
                            return {
                                ...card,
                                isMatched: true
                            }
                        else return card
                    })
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    return (
        <div className="app">
            <p>Turns: {turns}</p>
            <button onClick={startGame} >New Game</button>
            <div className="cards-grid">
                {cards?.map(card => (
                    <CardFrame key={card.id}
                        cardData={card}
                        onClick={handleChoice}
                        isFlipped={card === choiceOne || card === choiceTwo || card.isMatched}
                        isDisabled={disabled} />
                ))}
            </div>
        </div>
    )
}

export default Board;