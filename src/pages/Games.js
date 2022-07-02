import { useState, useEffect } from "react"
import { Layout, Card } from 'antd';
import { getDataGames } from '../services.js'
const { Content } = Layout;

const Games = (props) => {
  const [games, setGames] = useState([])
  const handleGet = () => {
    getDataGames()
      .then(game => {
        setGames(game.data)
      })
      .catch(err => console.log(err.message))
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
      <h1 style={{ "fontSize": "30px" }}>Popular Games</h1>
      <div className="container" style={{ display: "flex" }}>
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
