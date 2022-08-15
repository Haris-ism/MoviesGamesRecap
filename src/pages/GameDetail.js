import { useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useParams } from "react-router-dom";
import { useFormik } from 'formik'
import { Image } from 'antd';
import { getDataGame } from '../services'
const GameDetail = () => {
  const context = useContext(UserContext)
  const loader = context.loader
  const setLoader = context.setLoader
  let { id } = useParams();
  const formik = useFormik({
    initialValues: {
      name: "",
      genre: "",
      image_url: "",
      singlePlayer: "",
      multiplayer: "",
      platform: "",
      release: ""
    }
  })
  const handleGet = async () => {
    setLoader(true)
    try {
      const result = await getDataGame(id, "name genre image_url singlePlayer multiPlayer platform release")
      formik.setValues({
        name: result.data.data.fetchOneGame.name,
        genre: result.data.data.fetchOneGame.genre,
        image_url: result.data.data.fetchOneGame.image_url,
        singlePlayer: result.data.data.fetchOneGame.singlePlayer,
        multiplayer: result.data.data.fetchOneGame.multiplayer,
        platform: result.data.data.fetchOneGame.platform,
        release: result.data.data.fetchOneGame.release
      })
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoader(false)
  }
  useEffect(() => {
    handleGet()
  }, [])
  return (
    <>{!loader &&
      <div id="article-list">
        <div style={{ display: "flex", "margin-top": "20px" }}>
          <Image src={formik.values.image_url} style={{ width: "300px", height: "400px", objectFit: "cover", "borderRadius": "15px" }} />
          <div style={{ float: "left", "fontSize": "20px", padding: "10px", top: 0, display: "inline-block" }}>
            <h3 style={{ "fontSize": "30px" }}>{formik.values.name} ({formik.values.release})</h3>
            <div>{formik.values.singlePlayer ? `Singleplayer` : ''} {formik.values.multiplayer ? `Multiplayer` : ''}</div><br />
            <div>Genre:</div>
            <div>{formik.values.genre}</div><br />
            <div>Platform:</div>
            <div>{formik.values.platform}</div>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default GameDetail
