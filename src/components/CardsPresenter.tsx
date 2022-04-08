import { Card, Difficulty } from "../models/models"

type CardsPresenterProps<T> = {
    items: T[],
    difficulty: Difficulty,
    setCards: (data: T[]) => Card[]
}

function CardsPresenter<T>(props: CardsPresenterProps<T>) {

    function prepareCards(): Card[] {
        let slicedCards = sliceReceivedItems(props.items, getNumberOfNumber(props.difficulty))
        let pairedCards = shuffle([...slicedCards, ...slicedCards])
        return props.setCards(pairedCards)
    }

    function sliceReceivedItems(items: T[], numberOfCards: number): T[] {
        if (items.length < numberOfCards) {
            alert("There are not enough cards in this game series!\n\nTry another one please.")
            return []
        }
        return shuffle(items).slice(0, numberOfCards)
    }

    function getNumberOfNumber(difficulty: Difficulty): number {
        switch (difficulty) {
            case Difficulty.Easy:
                return 4
            case Difficulty.Medium:
                return 6
            case Difficulty.Advanced:
                return 9
        }
    }

    function shuffle(array: T[]): T[] {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }


    return prepareCards()
}

export default CardsPresenter