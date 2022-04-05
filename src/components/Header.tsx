import HeaderButton from './HeaderButton'
import { GameType } from './App'
import '../scss/header.scss'

type HeaderProps = {
    onGameSelected: (gameType: GameType) => void
}

const Header = (props: HeaderProps) => {

    return (
        <header className='header'>
            <HeaderButton
                className='header-button'
                color='red'
                text='Mario Sports Superstars'
                onClick={() => {
                    props.onGameSelected(GameType.MarioSportsSuperstars)
                }} />

            <HeaderButton
                className='header-button'
                color='#F55806'
                text='Animal Crossing'
                onClick={() => {
                    props.onGameSelected(GameType.AnimalCrossing)
                }} />

            <HeaderButton
                className='header-button'
                color='#183CFF'
                text='Pokemon'
                onClick={() => {
                    props.onGameSelected(GameType.Pokemon)
                }} />
        </header>
    )
}

export default Header