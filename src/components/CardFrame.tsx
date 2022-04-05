import '../scss/card.scss';

export type CardModel = {
    id: string,
    src: string,
    name: string,
    isMatched: boolean
}

type CardFrameProps = {
    key: string,
    cardData: CardModel,
    onClick: (card: CardModel) => void,
    isFlipped: boolean,
    isDisabled: boolean
}

function CardFrame(props: CardFrameProps) {

    const handleClick = () => {
        if (!props.isDisabled)
            props.onClick(props.cardData)
    };

    return (
        <div className='card'>
            <div className={props.isFlipped ? 'flipped' : ''}>
                <img className='front'
                    src={props.cardData.src}
                    alt={'card front'} />

                <img className='back'
                    src='/img/nintendo-logo.png'
                    onClick={handleClick}
                    alt='card back' />
            </div>
        </div>
    )
}

export default CardFrame