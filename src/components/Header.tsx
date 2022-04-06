import HeaderButton from './HeaderButton'
import { Difficulty, GameStatus, GameType } from './App'
import '../scss/header.scss'

type HeaderProps = {
    currentSelectedGame: GameType,
    currentSelectedDifficulty: Difficulty,
    onGameSelected: (gameType: GameType) => void,
    onNewGameClicked: (gameStatus: GameStatus) => void,
    onDifficultySelected: (difficulty: Difficulty) => void,
}

const Header = (props: HeaderProps) => {

    return (
        <>
            <header className='header'>
                    <button
                    className={`header-button mario-sports ${props.currentSelectedGame === GameType.MarioSportsSuperstars ? 'header-selected' : ''}`}
                    onClick={() => {
                        props.onGameSelected(GameType.MarioSportsSuperstars)
                    }}>Mario Sports Superstars</button>
                <button
                    className={`header-button animal-crossing ${props.currentSelectedGame === GameType.AnimalCrossing ? 'header-selected' : ''}`}
                    onClick={() => {
                        props.onGameSelected(GameType.AnimalCrossing)
                    }}>Animal Crossing</button>
                <button
                    className={`header-button pokemon ${props.currentSelectedGame === GameType.Pokemon ? 'header-selected' : ''}`}
                    onClick={() => {
                        props.onGameSelected(GameType.Pokemon)
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
                    onClick={() => { props.onNewGameClicked(GameStatus.Ready) }}>New Game</button>
            </div>
        </>

    )
}

export default Header