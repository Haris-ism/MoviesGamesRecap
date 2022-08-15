import axios from "axios"
import 'dotenv/config'
export const getDataMovies = (input) => {
    console.log(process.env.REACT_APP_GRAPHQL)
    return axios.post(process.env.REACT_APP_GRAPHQL, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            fetchMovies{
              ${input}
            }
          }`
    })

}
export const getDataGames = (input) => {
    return axios.post(process.env.REACT_APP_GRAPHQL, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            fetchGames{
              ${input}
            }
          }`
    })
}
export const registration = (input) => {
    return axios.post(process.env.REACT_APP_GRAPHQL, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `
        mutation{
            createUser(userInput:{
              email:"${input.email}",
              password:"${input.password}"
            }){
              email _id
            }
          }`
    })
}
export const login = (input) => {
    return axios.post(process.env.REACT_APP_GRAPHQL, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            login(
                email:"${input.email}",
                password:"${input.password}"
            ){
              userId user token
            }
          }`
    })
}
export const changePassword = (input, token) => {
    return axios.post(process.env.REACT_APP_GRAPHQL, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
        mutation{
            changePassword(
              email:"${input.email}",
              password:"${input.newPassword}",
              confirmPassword:"${input.confirmPassword}"
            ){
              password email
            }
          }
        `
    })
}
export const getDataGame = (id, input) => {
    return axios.post(`${process.env.REACT_APP_GRAPHQL}/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            fetchOneGame(id:"${id}"){
              ${input}
            }
          }`
    })
}
export const getDataMovie = (id, input) => {
    return axios.post(`${process.env.REACT_APP_GRAPHQL}/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            fetchOneMovie(id:"${id}"){
              ${input}
            }
          }`
    })
}
export const putDataGame = (id, input, token) => {
    return axios.post(`${process.env.REACT_APP_GRAPHQL}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                editGames(id:"${id}",
                    inputGames:{
                        name: "${input.name}",
                        genre: "${input.genre}",
                        image_url: "${input.image_url}",
                        singlePlayer: ${input.singlePlayer},
                        multiPlayer: ${input.multiPlayer},
                        platform: "${input.platform}",
                        release: ${input.release}
                }){
                  name _id
                } 
              }`
    })
}
export const putDataMovie = (id, input, token) => {
    return axios.post(`${process.env.REACT_APP_GRAPHQL}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                editMovies(id:"${id}",
                    inputMovies:{
                        title: "${input.title}",
                        rating: ${input.rating},
                        image_url: "${input.image_url}",
                        genre: "${input.genre}",
                        duration: ${input.duration},
                        year: ${input.year},
                        review: "${input.review}",
                        description: "${input.description}"
                }){
                  title genre _id
                } 
              }`
    })
}
export const postDataGame = (input, token) => {
    return axios.post(process.env.REACT_APP_GRAPHQL, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                createGames(inputGames:{
                    name: "${input.name}",
                    genre: "${input.genre}",
                    image_url: "${input.image_url}",
                    singlePlayer: ${input.singlePlayer},
                    multiPlayer: ${input.multiPlayer},
                    platform: "${input.platform}",
                    release: ${input.release}
                }){
                  name 
                } 
              }`
    })
}
export const postDataMovie = (input, token) => {
    return axios.post(process.env.REACT_APP_GRAPHQL, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                createMovies(inputMovies:{
                    title: "${input.title}",
                    rating: ${input.rating},
                    image_url: "${input.image_url}",
                    genre: "${input.genre}",
                    duration: ${input.duration},
                    year: ${input.year},
                    review: "${input.review}",
                    description: "${input.description}"
                }){
                  title _id
                } 
              }`
    })
}
export const deleteDataGame = (id, token) => {
    return axios.post(process.env.REACT_APP_GRAPHQL, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                deleteGames(id:"${id}"){
                  name _id
                } 
              }`
    })
}
export const deleteDataMovie = (id, token) => {
    return axios.post(process.env.REACT_APP_GRAPHQL, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                deleteMovies(id:"${id}"){
                  title _id
                } 
              }`
    })
}