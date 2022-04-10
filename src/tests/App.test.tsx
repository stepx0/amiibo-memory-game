import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from 'components/App'
import { debug } from 'console'

test('cards rendering test', async () => {
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
})

