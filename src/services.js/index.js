import axios from "axios"

export const getDataMovies = () => {
    return axios.get(process.env.REACT_APP_MOVIES_API)
}
export const getDataGames = () => {
    return axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/games`)
}
export const registration = (input) => {
    return axios.post("https://backendexample.sanbersy.com/api/register", input)
}
export const login = (input) => {
    return axios.post("https://backendexample.sanbersy.com/api/user-login", input)
}
export const changePassword = (input, header) => {
    return axios.post("https://backendexample.sanbersy.com/api/change-password", input, header)
}
export const getDataGame = (id) => {
    return axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/games/${id}`)
}
export const getDataMovie = (id) => {
    return axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/movies/${id}`)
}