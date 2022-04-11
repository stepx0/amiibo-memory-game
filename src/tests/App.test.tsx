import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from 'components/App'
import { debug } from 'console'

test('game series buttons exist', async () => {
    render(<App />)

    const marioButton = screen.queryByText('Mario Sports')
    const animalCrossingButton = screen.queryByText('Animal Crossing')
    const pokemonButton = screen.queryByText('Pokémon')

    expect(marioButton).toBeVisible()
    expect(animalCrossingButton).toBeVisible()
    expect(pokemonButton).toBeVisible()
})

test('difficulty buttons exist', async () => {
    render(<App />)

    const easyButton = screen.queryByText('Easy')
    const mediumButton = screen.queryByText('Medium')
    const advancedButton = screen.queryByText('Advanced')

    expect(easyButton).toBeVisible()
    expect(mediumButton).toBeVisible()
    expect(advancedButton).toBeVisible()
})

test('cards clicking test', async () => {
    render(<App />)

    const easyButton = screen.queryByText('Easy')
    expect(easyButton).toBeVisible()

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
