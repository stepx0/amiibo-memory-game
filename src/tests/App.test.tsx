import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from 'components/App'
import { debug } from 'console'

test('cards clicking test', async () => {
    render(<App />)

    const easyButton = screen.queryByText('Easy')
    const mediumButton = screen.queryByText('Medium')
    const advancedButton = screen.queryByText('Advanced')

    expect(easyButton).toBeVisible()
    expect(mediumButton).toBeVisible()
    expect(advancedButton).toBeVisible()

    // testing easy game layout
    if (easyButton != null)
        fireEvent.click(easyButton)

    let cardBacks = await waitFor(() => {
        let cardBacks = screen.queryAllByTestId("back")
        expect(cardBacks.length).toBe(8)
        debug(cardBacks.length)
        return cardBacks
    })

    fireEvent.click(cardBacks[0])

    //checking flipped cards
    let flipped = await waitFor(() => {
        let flippedCards = screen.queryAllByTestId("card flipped")
        expect(flippedCards.length).toBe(1)

        return flippedCards
    })

    debug(flipped.length)
})

test('complete game test', async () => {
    render(<App />)

    const easyButton = screen.queryByText('Easy')
    const mediumButton = screen.queryByText('Medium')
    const advancedButton = screen.queryByText('Advanced')

    expect(easyButton).toBeVisible()
    expect(mediumButton).toBeVisible()
    expect(advancedButton).toBeVisible()

    // testing easy game layout
    if (easyButton != null)
        fireEvent.click(easyButton)

    let cardBacks = await waitFor(() => {
        let cardBacks = screen.queryAllByTestId("back")
        expect(cardBacks.length).toBe(8)

        return cardBacks
    })

    //checking flipped cards
    let cardsFlippedFronts = await waitFor(() => {
        let flippedCards = screen.queryAllByTestId("card flipped")
        expect(flippedCards.length).toBeLessThanOrEqual(8)

        return flippedCards
    })

    for (let i = 0; i < cardBacks.length; i++) {
    let fixedIndex = 1
    await check(fixedIndex, cardBacks)
    }


    async function check(index: number, cardBacks: HTMLElement[]) {
        debug("fixed index: ", index)
        let indexes = [0, 1, 2, 3, 4, 5, 6, 7]

        let filtered = indexes.filter((n) => n !== index)
        debug("indexes:", filtered)

        await filtered.forEach(async (i) => {
            fireEvent.click(cardBacks[index])
            fireEvent.click(cardBacks[i])
            await new Promise((r) => setTimeout(r, 500))
            //todo: code after this Promise doesn't get triggered!!
            await checkFlipped()
            debug("clicked:", index, i)
        })
    }


    async function checkFlipped() {
        let flippedNow = await waitFor(() => {
            let flippedCards = screen.queryAllByTestId("flipped")
            expect(flippedCards.length).toBeMoreThanOne()

            return flippedCards
        })

        debug("length of flipped: ", flippedNow.length)
        return flippedNow.length >= 8
    }
})

