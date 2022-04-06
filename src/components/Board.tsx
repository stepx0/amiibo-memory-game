import { useEffect, useRef, useState } from 'react'
import CardFrame, { CardModel } from './CardFrame'
import '../scss/board.scss'
import { Difficulty, GameStatus } from './App'


type BoardProps = {
    cards: CardModel[],
    difficulty: Difficulty,
    onGameCompleted: (gameStatus: GameStatus) => void
}

function Board(props: BoardProps) {
    const [cards, setCards] = useState<CardModel[]>();
    const [turns, setTurns] = useState<number>(0);
    const [choiceOne, setChoiceOne] = useState<CardModel | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<CardModel | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

    // start the game
    useEffect(() => {
        startGame();
    }, [props.cards])

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

    // check if game is Completed
    useEffect(() => {
        let unmatchedCard = cards?.find(card => card.isMatched === false)

        if (!unmatchedCard && (cards?.length ?? 0) > 0) {
            setTimeout(() => props.onGameCompleted(GameStatus.Completed), 400)

        }
    }, [cards])

    const startGame = () => {
        setCards(props.cards)

        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
    }

    const handleChoice = (card: CardModel) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    return (
        <div className='app'>
            <p className='board-label'> Turns: {turns}</p>
            <div className={props.difficulty === Difficulty.Advanced ? 'cards-bigger-grid' : 'cards-grid'}>
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