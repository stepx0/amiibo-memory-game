import { v4 as uuidv4 } from 'uuid'
import { Card } from '../components/CardsPresenter'
import { Amiibo } from './queries'

export const amiibosToCards = (amiibos: Amiibo[]) => {
    let parsedCards: Card[] = amiibos.map(amiibo => ({
        id: uuidv4(),
        src: amiibo.image,
        name: amiibo.name,
        isMatched: false,
    }))
    return parsedCards
}