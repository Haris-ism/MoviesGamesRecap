import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Layout, Card } from 'antd';
import { getDataGames } from '../services'
const { Content } = Layout;

const Games = (props) => {
  const [, , , setLoader] = useContext(UserContext)
  const [games, setGames] = useState([])
  const handleGet = async () => {
    setLoader(true)
    await getDataGames()
      .then(game => {
        setGames(game.data)
      })
      .catch(err => console.log(err.message))
    setLoader(false)
  }
  const detailGames = (id) => {
    const { history } = props;
    if (history) {
      history.push(`/game/${id}`)
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
      style={{ padding: 0, margin: 0, minHeight: 280 }}
    >
      <h1 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Popular Games</h1>
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        {
          games.map((item) => {
            return (
              <div className="cards" >
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
          })
        }
      </div>
    </Content>
  )
}
export default Games
