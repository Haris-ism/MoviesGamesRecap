import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Layout, Card } from 'antd'
import { getDataMovies } from '../services'
const { Content } = Layout

const Movies = (props) => {
  const context = useContext(UserContext)
  const setLoader = context.setLoader
  const [movies, setMovies] = useState([])
  const handleGet = async () => {
    setLoader(true)
    await getDataMovies()
      .then(movie => {
        setMovies(movie.data)
      })
      .catch(err => console.log(err.message))
    setLoader(false)
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
    <Content
      className="site-layout-background"
      style={{
        padding: 0,
        margin: 0,
        minHeight: 280,
      }}
    >
      <h1 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Popular Movies</h1>
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        {
          movies.map((item) => {
            return (
              <div className="cards" >
                <Card onClick={() => { detailMovies(item.id) }} value={item.id} hoverable="true" style={{ "borderRadius": "15px" }} bodyStyle={{ padding: "0px" }}>
                  <img src={item.image_url} />
                  <label>{truncateString(item.title, 23)}</label>
                  <br />
                  <label>Genre: {truncateString(item.genre, 20)}</label>
                  <br />
                  <label>Year: {item.year}</label>
                </Card>
              </div>
            )
          })
        }
      </div>
    </Content>
  )
}
export default Movies
