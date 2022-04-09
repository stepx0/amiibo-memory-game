import { act, fireEvent, getByText, render, screen } from '@testing-library/react'
import App from 'components/App'
import { MockedProvider } from '@apollo/client/testing'

test('check visibility', () => {
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

test('play a match', async () => {
    render(<App />)

    const easyButton = screen.queryByText('Easy')
    const mediumButton = screen.queryByText('Medium')
    const advancedButton = screen.queryByText('Advanced')
    
    expect(easyButton).toBeVisible()
    expect(mediumButton).toBeVisible()
    expect(advancedButton).toBeVisible()

    const grid = screen.getByTestId('board')
    expect(grid).toBeVisible()

    //const items = screen.queryAllByTestId("card")
    //expect(items.length).toBe(8)    
})

