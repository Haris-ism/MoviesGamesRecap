import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Carousel, Card } from 'antd';
import { getDataMovies, getDataGames } from '../services'

const Home = (props) => {
  const [, , , setLoader] = useContext(UserContext)
  const [movies, setMovies] = useState([])
  const [games, setGames] = useState([])
  const handleGet = async () => {
    setLoader(true)
    try {
      const movie = await getDataMovies()
      setMovies(movie.data)
      const game = await getDataGames()
      setGames(game.data)
    }
    catch (err) {
      console.log(err.message)
    }
    setLoader(false)
  }
  const detailGames = (id) => {
    const { history } = props;
    if (history) {
      history.push(`/game/${id}`)
    }
  }
  const detailMovies = (id) => {
    const { history } = props;
    if (history) {
      history.push(`/movie/${id}`)
    }
  }
  const truncateString = (str, num) => {
    if (str === undefined) {
      return ""
    } else {
      if (str === null) {
        return ""
      } else {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
    }
  }
  useEffect(() => {
    handleGet();
  }, [])
  return (
    <>
      <Carousel autoplay style={{ "marginTop": "20px", "borderRadius": "15px", "backgroundColor": "rgba(13, 47, 92, 1)" }}>
        {
          movies.map((item, index) => {
            if ((movies.length) - index < 6) {
              return (
                <div>
                  <img className="carousel" src={item.image_url} />
                  <div >
                    <div style={{ "textAlign": "center", "fontSize": "20px", color: "white" }}>{item.title}</div>
                  </div>
                </div>
              )
            }
          })
        }
      </Carousel>
      <br />
      <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Movies</h2>
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        {
          movies.map((item, index) => {
            if ((movies.length) - index < 7) {
              return (
                <div className="cards" >
                  <Card onClick={() => { detailMovies(item.id) }} value={item.id} hoverable="true" style={{ "borderRadius": "15px" }} bodyStyle={{ padding: "0px" }}>
                    <img src={item.image_url} />
                    <label>{truncateString(item.title, 23)}</label>
                    <br />
                    <label>Genre : {truncateString(item.genre, 20)}</label>
                    <br />
                    <label>Year : {item.year}</label>
                  </Card>
                </div>
              )
            }
          })
        }
      </div>
      <br />
      <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Games</h2>
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        {
          games.map((item, index) => {
            if ((games.length) - index < 7) {
              return (
                <div className="cards">
                  <Card onClick={() => { detailGames(item.id) }} value={item.id} hoverable="true" style={{ "borderRadius": "15px" }} bodyStyle={{ padding: "0px" }}>
                    <img src={item.image_url} />
                    <label>{item.name}</label>
                    <br />
                    <label>Platform : </label>
                    <br />
                    <label>{truncateString(item.platform, 25)}</label>
                  </Card>
                </div>
              )
            }
          })
        }
      </div>
    </>
  )
}
export default Home