import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { StarTwoTone, ClockCircleTwoTone } from '@ant-design/icons'
import { Image } from 'antd'
import star from './star.png'
import { getDataMovie } from '../services.js'
import { useFormik } from 'formik'
const MovieDetail = () => {
  let { id } = useParams();
  const formik = useFormik({
    initialValues: {
      title: "",
      rating: "",
      genre: "",
      image_url: "",
      duration: "",
      year: "",
      review: "",
      description: ""
    }
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataMovie(id)
        formik.setValues({
          title: result.data.title,
          rating: result.data.rating,
          genre: result.data.genre,
          image_url: result.data.image_url,
          duration: result.data.duration,
          year: result.data.year,
          review: result.data.review,
          description: result.data.description
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
          <div style={{ float: "left", "fontSize": "20px", padding: "10px", top: 0 }}>
            <h3 style={{ "fontSize": "30px" }}>{formik.values.title} ({formik.values.year})</h3>
            <div style={{ "fontSize": "23px" }}>({formik.values.rating}) <img src={star} style={{ width: "1.2em" }} /><StarTwoTone /><StarTwoTone />
              | <ClockCircleTwoTone /> {formik.values.duration} Minutes | {formik.values.genre}</div><br />
            <div >Description:</div>
            <div>{formik.values.description}</div>
            <br />
            <div>Review:</div>
            <div>{formik.values.review}</div>
          </div>
        </div>
      </div>

    </>
  )
}

export default MovieDetail
