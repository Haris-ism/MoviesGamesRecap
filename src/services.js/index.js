import axios from "axios"

export const getDataMovies = () => {
    return axios.get(process.env.REACT_APP_MOVIES_API)
}
export const getDataGames = () => {
    return axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/games`)
}