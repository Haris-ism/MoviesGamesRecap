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
    try {
      const movie = await getDataMovies("_id genre image_url title year")
      setMovies(movie.data.data.fetchMovies)
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoader(false)
  }
  const detailMovies = (_id) => {
    const { history } = props;
    if (history) {
      history.push(`/movie/${_id}`)
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
                <Card onClick={() => { detailMovies(item._id) }} value={item._id} hoverable="true" style={{ "borderRadius": "15px" }} bodyStyle={{ padding: "0px" }}>
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
