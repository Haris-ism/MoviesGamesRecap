import { useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Form, Input, Button, Image } from 'antd';
import { useParams, useHistory } from "react-router-dom";
import { getDataMovie, putDataMovie } from '../services'
import { useFormik } from 'formik'
const MovieEdit = () => {
  const token = localStorage.getItem('token')
  const { TextArea } = Input
  let { id } = useParams()
  const context = useContext(UserContext)
  const setLoader = context.setLoader
  let history = useHistory()
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
  const handleGet = async () => {
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
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
  }
  useEffect(() => {
    handleGet()
  }, [])

  const handleSubmit = async () => {
    setLoader(true)
    try {
      await putDataMovie(id, {
        title: formik.values.title,
        rating: formik.values.rating,
        genre: formik.values.genre,
        image_url: formik.values.image_url,
        duration: formik.values.duration,
        year: formik.values.year,
        review: formik.values.review,
        description: formik.values.description
      }, token)
      alert("Edit Success")
      history.push(`/movie/edit`)
    }
    catch (err) {
      if (err.response?.data?.errors[0]?.message !== 'Please Login') {
        alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
      } else {
        alert("Session Expired, Please Login.")
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        history.push(`/login`)
      }
    }
    setLoader(false)
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    }
  }
  return (
    <>
      <div style={{ display: "flex", "justifyContent": "center", margin: "30px" }}>
        <Form {...layout} onFinish={handleSubmit} validateMessages={validateMessages} >
          <Form.Item label="Title" >
            <Input name="title" value={formik.values.title} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Genre" >
            <Input name="genre" value={formik.values.genre} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Rating" >
            <Input name="rating" value={formik.values.rating} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Image Url" >
            <Input name="image_url" value={formik.values.image_url} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Review" >
            <TextArea name="review" value={formik.values.review} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Description" >
            <TextArea name="description" value={formik.values.description} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Duration" >
            <Input name="duration" value={formik.values.duration} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Year" >
            <Input type="number" name="year" value={formik.values.year} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div style={{ "marginLeft": "10px" }}>
          <Image width={200} src={formik.values.image_url} />
        </div>
      </div>
    </>
  )
}

export default MovieEdit
