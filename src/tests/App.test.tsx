import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from 'components/App'

test('render app and buttons are visible', () => {
    const { getByText } = render(<App />)

    const easyButton = screen.queryByText('Easy')
    const mediumButton = screen.queryByText('Medium')
    const advancedButton = screen.queryByText('Advanced')

    expect(easyButton).toBeVisible()
    expect(mediumButton).toBeVisible()
    expect(advancedButton).toBeVisible()

    const grid = screen.getByTestId('board')
    expect(grid).toBeVisible()
})

test('cards rendering test', async () => {
    render(<App />)

    const easyButton = screen.queryByText('Easy')
    const mediumButton = screen.queryByText('Medium')
    const advancedButton = screen.queryByText('Advanced')

    expect(easyButton).toBeVisible()
    expect(mediumButton).toBeVisible()
    expect(advancedButton).toBeVisible()

    const grid = screen.getByTestId('board')
    expect(grid).toBeVisible()

    // testing easy game layout
    if (easyButton != null)
        fireEvent.click(easyButton)
    await waitFor(() => expect(screen.queryAllByTestId("card").length).toBe(8))

    // testing medium game layout
    if (mediumButton != null)
        fireEvent.click(mediumButton)
    await waitFor(() => expect(screen.queryAllByTestId("card").length).toBe(12))

    // testing advanced game layout
    if (advancedButton != null)
        fireEvent.click(advancedButton)
    await waitFor(() => expect(screen.queryAllByTestId("card").length).toBe(18))
})

