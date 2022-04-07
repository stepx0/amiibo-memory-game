import '../scss/header.scss'
import { GameSeriesType, Difficulty, GamePhase } from '../models/models'

type HeaderProps = {
    currentSelectedGame: GameSeriesType,
    currentSelectedDifficulty: Difficulty,
    onGameSeriesSelected: (gameType: GameSeriesType) => void,
    onNewGameClicked: (gameStatus: GamePhase) => void,
    onDifficultySelected: (difficulty: Difficulty) => void,
}

const Header = (props: HeaderProps) => {

    return (
        <>
            <header className='header'>
                <button
                    className='options-button mario-sports'
                    onClick={() => {
                        props.onGameSeriesSelected(GameSeriesType.MarioSportsSuperstars)
                    }}>Mario Sports Superstars</button>
                <button
                    className='options-button animal-crossing'
                    onClick={() => {
                        props.onGameSeriesSelected(GameSeriesType.AnimalCrossing)
                    }}>Animal Crossing</button>
                <button
                    className='options-button pokemon'
                    onClick={() => {
                        props.onGameSeriesSelected(GameSeriesType.Pokemon)
                    }}>Pokemon</button>
            </header>
            <div>
                <button className={`options-button ${(props.currentSelectedDifficulty === Difficulty.Easy) ? 'options-selected' : ''}`}
                    onClick={() => {
                        props.onDifficultySelected(Difficulty.Easy)
                    }}> Easy </button>
                <button className={`options-button ${(props.currentSelectedDifficulty === Difficulty.Medium) ? 'options-selected' : ''}`}
                    onClick={() => {
                        props.onDifficultySelected(Difficulty.Medium)
                    }}> Medium </button>
                <button className={`options-button ${(props.currentSelectedDifficulty === Difficulty.Advanced) ? 'options-selected' : ''}`}
                    onClick={() => {
                        props.onDifficultySelected(Difficulty.Advanced)
                    }}> Advanced </button>
            </div>
            <div>
                <button
                    className='options-button new-game'
                    onClick={() => { props.onNewGameClicked(GamePhase.Ready) }}>New Game</button>
            </div>
        </>

    )
}

export default Header