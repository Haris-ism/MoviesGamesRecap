import { useEffect, useState } from "react"
import { Layout, Card } from 'antd'
import { getDataMovies } from '../services.js'
const { Content } = Layout

const Movies = (props) => {
  const [movies, setMovies] = useState([])
  const handleGet = async () => {
    try {
      const movie = await getDataMovies()
      setMovies(movie.data)
    }
    catch (err) {
      console.log(err.message)
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
    <Content
      className="site-layout-background"
      style={{
        padding: 0,
        margin: 0,
        minHeight: 280,
      }}
    >
      <h1 style={{ "fontSize": "30px" }}>Popular Movies</h1>
      <div className="container" style={{ display: "flex" }}>
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
