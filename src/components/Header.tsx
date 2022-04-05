import HeaderButton, { GameType } from './HeaderButton'
import '../scss/header.scss'

type HeaderProps = {
}

const Header = (props: HeaderProps) => {

    const onClick = (id: GameType) => {
        switch (id) {
            case GameType.MarioSportsSuperstars: {
                console.log('Mario Sports Superstar');
                //todo: call api to download cards
                break;
            }
            case GameType.AnimalCrossing: {
                console.log('Animal Crossing');
                //todo: call api to download cards
                break;
            }
            case GameType.Pokemon: {
                console.log('pokemon');
                //todo: call api to download cards
                break;
            }
        }
    }

    return (
        <header className='header'>
            <HeaderButton
                className='header-button'
                color='red'
                text='Mario Sports Superstars'
                onClick={(event) => {
                    onClick(GameType.MarioSportsSuperstars)
                }} />

            <HeaderButton
                className='header-button'
                color='#F55806'
                text='Animal Crossing'
                onClick={(event) => {
                    onClick(GameType.AnimalCrossing)
                }} />

            <HeaderButton
                className='header-button'
                color='#183CFF'
                text='Pokemon'
                onClick={(event) => {
                    onClick(GameType.Pokemon)
                }} />
        </header>
    )
}

export default Header