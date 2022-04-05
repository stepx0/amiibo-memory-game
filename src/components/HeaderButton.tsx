type ButtonProps = {
    color: string,
    text: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const enum GameType {
    MarioSportsSuperstars,
    AnimalCrossing,
    Pokemon
}

export default function HeaderButton(props: ButtonProps) {
    return (
        <button
            className="btn"
            onClick={props.onClick}
            style={{ backgroundColor: props.color }}>
            {props.text}
        </button>
    )
}
