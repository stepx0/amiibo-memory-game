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
            <div className={props.isFlipped ? 'flipped' : ''}>
                <img className='front'
                    src={props.cardData.src}
                    alt={'card front'} />

                <div className='back'>
                    <img className='back-logo'
                        src='/img/logo.svg'
                        onClick={handleClick}
                        alt='card back' />
                </div>

            </div>
        </div>
    )
}

export default CardFrame