import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import "./MobileAppsList.css"
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik'
import { postDataMovie } from '../services.js'
const MovieForm = () => {
  const { TextArea } = Input;
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
  const [user, setUser] = useContext(UserContext)
  let history = useHistory();
  const handleSubmit = () => {
    postDataMovie({
      description: formik.values.description,
      duration: parseInt(formik.values.duration),
      genre: formik.values.genre,
      image_url: formik.values.image_url,
      rating: parseInt(formik.values.rating),
      review: formik.values.review,
      title: formik.values.title,
      year: parseInt(formik.values.year)
    })
      .then(() => {
        alert("Create Success")
        history.push(`/movie/edit`)
      })
      .catch(err => console.log(err.message))
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
