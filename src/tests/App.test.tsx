import { fireEvent, getByText, render, screen } from '@testing-library/react'
import App from 'components/App'

test('finds Mario Sports', () => {
    const { getByText } = render(<App />)

    const easyButton = screen.queryByText('Easy')
    const mediumButton = screen.queryByText('Medium')
    const advancedButton = screen.queryByText('Advanced')
    
    expect(easyButton).toBeVisible()
    expect(mediumButton).toBeVisible()
    expect(advancedButton).toBeVisible()
})