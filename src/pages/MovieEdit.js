import { useEffect } from "react"
import { Form, Input, Button, Image } from 'antd';
import { useParams, useHistory } from "react-router-dom";
import { getDataMovie, putDataMovie } from '../services'
import { useFormik } from 'formik'
const MovieEdit = () => {
  const { TextArea } = Input
  let { id } = useParams()
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
    await getDataMovie(id)
      .then(result => {
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
      })
      .catch(err => console.log("error:", err.message))
  }
  useEffect(() => {
    handleGet()
  }, [])

  const handleSubmit = () => {
    putDataMovie(id, {
      title: formik.values.title,
      rating: formik.values.rating,
      genre: formik.values.genre,
      image_url: formik.values.image_url,
      duration: formik.values.duration,
      year: formik.values.year,
      review: formik.values.review,
      description: formik.values.description
    })
      .then(() => {
        alert("Edit Success")
        history.push(`/movie/edit`)
      })
      .catch(err => console.log(err.message))
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
