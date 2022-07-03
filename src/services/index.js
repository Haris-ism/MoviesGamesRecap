import axios from "axios"

export const getDataMovies = () => {
    return axios.get(process.env.REACT_APP_MOVIES_API)
}
export const getDataGames = () => {
    return axios.get(process.env.REACT_APP_GAMES_API)
}
export const registration = (input) => {
    return axios.post(process.env.REACT_APP_REGISTER, input)
}
export const login = (input) => {
    return axios.post(process.env.REACT_APP_LOGIN, input)
}
export const changePassword = (input, header) => {
    return axios.post(process.env.REACT_APP_CHANGE_PASSWORD, input, header)
}
export const getDataGame = (id) => {
    return axios.get(`${process.env.REACT_APP_GAMES_API}/${id}`)
}
export const getDataMovie = (id) => {
    return axios.get(`${process.env.REACT_APP_MOVIES_API}/${id}`)
}
export const putDataGame = (id, input) => {
    return axios.put(`${process.env.REACT_APP_GAMES_API}/${id}`, input)
}
export const putDataMovie = (id, input) => {
    return axios.put(`${process.env.REACT_APP_MOVIES_API}/${id}`, input)
}
export const postDataGame = (input) => {
    return axios.post(`${process.env.REACT_APP_GAMES_API}`, input)
}
export const postDataMovie = (input) => {
    return axios.post(process.env.REACT_APP_MOVIES_API, input)
}
export const deleteDataGame = (id) => {
    return axios.delete(`${process.env.REACT_APP_GAMES_API}/${id}`)
}
export const deleteDataMovie = (id) => {
    return axios.delete(`${process.env.REACT_APP_MOVIES_API}/${id}`)
}