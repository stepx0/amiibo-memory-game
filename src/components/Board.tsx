import '../scss/board.scss'
import { useEffect, useState } from 'react'
import CardFrame from './CardFrame'
import { Card } from './CardsPresenter'
import { Difficulty, GamePhase } from './Game'


type BoardProps = {
    cards: Card[],
    difficulty: Difficulty,
    onGameCompleted: (gameStatus: GamePhase) => void
}

function Board(props: BoardProps) {
    const [cards, setCards] = useState<Card[]>()
    const [turns, setTurns] = useState<number>(0)
    const [choiceOne, setChoiceOne] = useState<Card | null>(null)
    const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
    const [disabled, setDisabled] = useState<boolean>(false)

    // start the game
    useEffect(() => {
        startGame()
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
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 500)
            }
        }
    }, [choiceOne, choiceTwo])

    // check if game is completed
    useEffect(() => {
        let unmatchedCard = cards?.find(card => card.isMatched === false)
        
        if (!unmatchedCard && (cards?.length ?? 0) > 0) {
            setTimeout(() => props.onGameCompleted(GamePhase.Completed), 400)
        }
    }, [cards])

    const startGame = () => {
        setCards(props.cards)
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(0)
    }

    const handleChoice = (card: Card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    function getGridsStyle(): string {
        switch(props.difficulty) {
            case Difficulty.Easy:
                return 'cards-small-grid'
            case Difficulty.Medium:
                return 'cards-medium-grid'
            case Difficulty.Advanced:
                return 'cards-big-grid'

        }
    }
    return (
        <div className='board'>
            <p className='board-label'> Turns: {turns}</p>
            <div className={`${getGridsStyle()}`}>
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

export default Board