/* -- ENUMS -- */
export const enum GameSeriesType {
    MarioSportsSuperstars,
    AnimalCrossing,
    Pokemon
}

export const enum Difficulty {
    Easy,
    Medium,
    Advanced
}

export const enum GamePhase {
    Ready,
    Ongoing,
    Completed
}


/* -- TYPES -- */
export type Card = {
    id: string,
    src: string,
    name: string,
    isMatched: boolean
}