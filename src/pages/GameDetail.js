import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useFormik } from 'formik'
import { Image } from 'antd';
import { getDataGame } from '../services.js'
const GameDetail = () => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataGame(id)
        formik.setValues({
          name: result.data.name,
          genre: result.data.genre,
          image_url: result.data.image_url,
          singlePlayer: result.data.singlePlayer,
          multiplayer: result.data.multiplayer,
          platform: result.data.platform,
          release: result.data.release
        })
      }
      catch (err) {
        console.log("error:", err.message)
      }
    }
    fetchData()
  }, [])
  return (
    <>
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
    </>
  )
}

export default GameDetail
