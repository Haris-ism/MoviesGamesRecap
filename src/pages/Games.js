import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Layout, Card } from 'antd';
import { getDataGames } from '../services'
const { Content } = Layout;

const Games = (props) => {
  const context = useContext(UserContext)
  const setLoader = context.setLoader
  const [games, setGames] = useState([])
  const handleGet = async () => {
    setLoader(true)
    try {
      const game = await getDataGames("_id name platform image_url")
      setGames(game.data.data.fetchGames)
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoader(false)
  }
  const detailGames = (_id) => {
    const { history } = props;
    if (history) {
      history.push(`/game/${_id}`)
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
                <Card onClick={() => { detailGames(item._id) }} value={item._id} hoverable="true" style={{ "borderRadius": "15px" }} bodyStyle={{ padding: "0px" }}>
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
