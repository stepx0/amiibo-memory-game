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
                {/*Mario Sports Superstars*/}
                <button
                    className='options-button mario-sports'
                    onClick={() => {
                        props.onGameSeriesSelected(GameSeriesType.MarioSportsSuperstars)
                    }}>Mario Sports Superstars</button>

                {/*Animal Crossing*/}
                <button
                    className='options-button animal-crossing'
                    onClick={() => {
                        props.onGameSeriesSelected(GameSeriesType.AnimalCrossing)
                    }}>Animal Crossing</button>

                {/*Pokémon*/}
                <button className='options-button pokemon'
                    onClick={() => {
                        props.onGameSeriesSelected(GameSeriesType.Pokemon)
                    }}>Pokémon</button>
            </header>

            <div>
                {/*Easy*/}
                <button className={`options-button ${(props.currentSelectedDifficulty === Difficulty.Easy) ? 'options-selected' : ''}`}
                    onClick={() => {
                        props.onDifficultySelected(Difficulty.Easy)
                    }}> Easy </button>

                {/*Medium*/}
                <button className={`options-button ${(props.currentSelectedDifficulty === Difficulty.Medium) ? 'options-selected' : ''}`}
                    onClick={() => {
                        props.onDifficultySelected(Difficulty.Medium)
                    }}> Medium </button>

                {/*Advanced*/}
                <button className={`options-button ${(props.currentSelectedDifficulty === Difficulty.Advanced) ? 'options-selected' : ''}`}
                    onClick={() => {
                        props.onDifficultySelected(Difficulty.Advanced)
                    }}> Advanced </button>
            </div>

            <div>
                {/*New Game*/}
                <button
                    className='options-button new-game'
                    onClick={() => { props.onNewGameClicked(GamePhase.Ready) }}>New Game</button>
            </div>
        </>
    )
}

export default Header