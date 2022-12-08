import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import "./MobileAppsList.css"
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik'
import { postDataMovie } from '../services'
const MovieForm = () => {
  const token = localStorage.getItem('token')
  const context = useContext(UserContext)
  const user = context.user
  const { TextArea } = Input;
  const formik = useFormik({
    initialValues: {
      title: "",
      rating: 0,
      genre: "",
      image_url: "",
      duration: 0,
      year: 0,
      review: "",
      description: ""
    }
  })
  let history = useHistory();
  const handleSubmit = async () => {
    try {
      await postDataMovie({
        description: formik.values.description,
        duration: Number(formik.values.duration),
        genre: formik.values.genre,
        image_url: formik.values.image_url,
        rating: Number(formik.values.rating),
        review: formik.values.review,
        title: formik.values.title,
        year: Number(formik.values.year)
      }, token)
      alert("Create Success")
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
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  return (
    <>
      <div style={{ display: "flex", "justifyContent": "center", margin: "30px" }}>
        <Form {...layout} onFinish={handleSubmit}>
          <Form.Item label="Title" >
            <Input name="title" value={formik.values.title} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Genre" >
            <Input name="genre" value={formik.values.genre} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Review" >
            <TextArea name="review" value={formik.values.review} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Description" >
            <TextArea name="description" value={formik.values.description} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Image Url" >
            <Input name="image_url" value={formik.values.image_url} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Duration" >
            <Input style={{ width: '100%' }} type="number" name="duration" value={formik.values.duration} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Year" >
            <Input style={{ width: '100%' }} type="number" name="year" value={formik.values.year} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Rating" >
            <Input style={{ width: '100%' }} type="number" name="rating" value={formik.values.rating} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default MovieForm
