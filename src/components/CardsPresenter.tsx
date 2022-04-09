import { Difficulty } from './Game'

export type Card = {
    id: string,
    src: string,
    name: string,
    isMatched: boolean
}

type CardsPresenterProps<T> = {
    items: T[],
    difficulty: Difficulty,
    setCards: (data: T[]) => Card[]
}

function CardsPresenter<T>(props: CardsPresenterProps<T>) {

    function prepareCards(): Card[] {
        console.log("preparing CARDS")
        let slicedCards = sliceReceivedItems(props.items, getNumberOfNumber(props.difficulty))
        let pairedCards = randomArrayShuffle([...slicedCards, ...slicedCards])
        return props.setCards(pairedCards)
    }

    function sliceReceivedItems(items: T[], numberOfCards: number): T[] {
        if (items.length < numberOfCards) {
            alert("There are not enough cards in this game series!\n\nTry another one please.")
            return []
        }
        console.log(randomArrayShuffle(items).slice(0, numberOfCards))
        return randomArrayShuffle(items).slice(0, numberOfCards)
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

    function randomArrayShuffle(array: T[]) {
        let arrayCopy = [...array];
        var currentIndex = arrayCopy.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = arrayCopy[currentIndex];
          arrayCopy[currentIndex] = arrayCopy[randomIndex];
          arrayCopy[randomIndex] = temporaryValue;
        }
        return arrayCopy;
      }
    
    return prepareCards()
}

export default CardsPresenter