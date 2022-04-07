import { getAmiibosByGameSeries } from "../../api/AmiiboAPI"
import { Amiibo } from "../../api/models"
import { GameSeriesType } from "../../models/models"

type ApiCallerProps = {
    gameSeries: GameSeriesType,
    callback: (data: Amiibo[]) => void
}

function ApiCaller(props: ApiCallerProps) {
    
    getAmiibosByGameSeries(
        getParamForAPICall(props.gameSeries),
        props.callback
    )

    function getParamForAPICall(gameType: GameSeriesType): string {
        switch (gameType) {
            case GameSeriesType.MarioSportsSuperstars: {
                return 'Mario Sports Superstars'
            }
            case GameSeriesType.AnimalCrossing: {
                return 'Animal Crossing'
            }
            case GameSeriesType.Pokemon: {
                return 'Pokemon'
            }
        }
    }
}

export default ApiCaller