import 'scss/card.scss'
import { Card } from 'components/CardsPresenter'

type CardFrameProps = {
    key: string,
    cardData: Card,
    onClick: (card: Card) => void,
    isFlipped: boolean,
    isDisabled: boolean
}

function CardFrame(props: CardFrameProps) {

    const handleClick = () => {
        if (!props.isDisabled)
            props.onClick(props.cardData)
    }

    return (
        <div data-testid='card' className='card'>
            <div className={props.isFlipped ? 'flipped' : ''}>
                <img className='front'
                    src={props.cardData.src}
                    alt='card front' />

                <div className='back'
                    onClick={handleClick}>
                    <img className='back-logo'
                        src='/img/logo.svg'
                        alt='card back' />
                </div>
            </div>
        </div>
    )
}

export default CardFrame