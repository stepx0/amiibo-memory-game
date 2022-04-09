import '../scss/header.scss'
import { Difficulty, GameSeriesType } from "./Game"

type HeaderProps = {
    currentSelectedGame: GameSeriesType,
    currentSelectedDifficulty: Difficulty,
    onGameSeriesSelected: (gameType: GameSeriesType) => void,
    onNewGameClicked: () => void,
    onDifficultySelected: (difficulty: Difficulty) => void,
}

const Header = (props: HeaderProps) => {

    return (
        <div className='header'>
            <header>
                {/*Mario Sports Superstars*/}
                <button
                    className={`header-button mario-sports ${(props.currentSelectedGame === GameSeriesType.MarioSportsSuperstars) ? 'header-selected' : ''}`}
                    onClick={() => {
                        props.onGameSeriesSelected(GameSeriesType.MarioSportsSuperstars)
                    }}>Mario Sports</button>

                {/*Animal Crossing*/}
                <button
                    className={`header-button animal-crossing ${(props.currentSelectedGame === GameSeriesType.AnimalCrossing) ? 'header-selected' : ''}`}
                    onClick={() => {
                        props.onGameSeriesSelected(GameSeriesType.AnimalCrossing)
                    }}>Animal Crossing</button>

                {/*Pokémon*/}
                <button className={`header-button pokemon ${(props.currentSelectedGame === GameSeriesType.Pokemon) ? 'header-selected' : ''}`}
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
                    onClick={() => { props.onNewGameClicked() }}>New Game</button>
            </div>
        </div>
    )
}

export default Header