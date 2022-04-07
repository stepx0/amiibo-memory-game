import axios from "axios"
import { Amiibo, AmiiboResponse } from "./models"

const BASE_URL = 'https://amiiboapi.com/api'

export const getAmiibosByGameSeries = async (param: string, setData: (data: Amiibo[]) => void) => {
    console.log("get api")
    try {
        const res = await axios.get<AmiiboResponse>(`${BASE_URL}/amiibo/?gameseries=${param}`)
        setData(res.data.amiibo)
    } catch (e) {
        alert("Oops, cand't load cards at the moment...")
    }
}