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
        <div className='card'>
            <div className={props.isFlipped ? 'flipped' : 'not-flipped'}
                data-testid={`card ${props.isFlipped ? 'flipped' : 'not-flipped'}`}>
                <img className='front'
                    src={props.cardData.src}
                    alt='card front' />

                <div data-testid='back' className='back'
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