import { useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useParams } from "react-router-dom"
import { StarTwoTone, ClockCircleTwoTone } from '@ant-design/icons'
import { Image } from 'antd'
import star from './star.png'
import { getDataMovie } from '../services'
import { useFormik } from 'formik'
const MovieDetail = () => {
  const context = useContext(UserContext)
  const loader = context.loader
  const setLoader = context.setLoader
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
  const fetchData = async () => {
    setLoader(true)
    try {
      const result = await getDataMovie(id, "_id title rating genre image_url duration year review description")
      formik.setValues({
        title: result.data.data.fetchOneMovie.title,
        rating: result.data.data.fetchOneMovie.rating,
        genre: result.data.data.fetchOneMovie.genre,
        image_url: result.data.data.fetchOneMovie.image_url,
        duration: result.data.data.fetchOneMovie.duration,
        year: result.data.data.fetchOneMovie.year,
        review: result.data.data.fetchOneMovie.review,
        description: result.data.data.fetchOneMovie.description
      })
    } catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoader(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {!loader &&
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
      }
    </>
  )
}

export default MovieDetail
