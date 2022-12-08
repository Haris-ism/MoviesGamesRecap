import { useEffect, useContext } from "react"
import { Form, Input, InputNumber, Button, Checkbox, Image } from 'antd';
import { UserContext } from "../context/UserContext"
import { useParams, useHistory } from "react-router-dom";
import { getDataGame, putDataGame } from '../services'
import { useFormik } from 'formik'
const GameEdit = () => {
  const token = localStorage.getItem('token')
  const context = useContext(UserContext)
  const setLoader = context.setLoader
  let { id } = useParams();
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      genre: "",
      image_url: "",
      singlePlayer: "",
      multiPlayer: "",
      platform: "",
      release: 0
    }
  })
  const handleGet = async () => {
    try {
      const result = await getDataGame(id, "name genre image_url singlePlayer multiPlayer platform release _id")
      formik.setValues({
        _id: result.data.data.fetchOneGame._id,
        name: result.data.data.fetchOneGame.name,
        genre: result.data.data.fetchOneGame.genre,
        image_url: result.data.data.fetchOneGame.image_url,
        singlePlayer: result.data.data.fetchOneGame.singlePlayer,
        multiPlayer: result.data.data.fetchOneGame.multiPlayer,
        platform: result.data.data.fetchOneGame.platform,
        release: result.data.data.fetchOneGame.release
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
      await putDataGame(id, {
        name: formik.values.name,
        genre: formik.values.genre,
        image_url: formik.values.image_url,
        platform: formik.values.platform,
        release: formik.values.release,
        singlePlayer: formik.values.singlePlayer,
        multiPlayer: formik.values.multiPlayer
      }, token)
      alert('Edit Success')
      history.push(`/game/edit`)
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
  };

  const validateMessages = {
    required: `label is required!`,
    types: {
      email: `label is not a valid email!`,
      number: `label is not a valid number!`,
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    }
  }
  return (
    <>
      <div style={{ display: "flex", "justifyContent": "center", margin: "30px" }}>
        <Form {...layout} onFinish={handleSubmit} validateMessages={validateMessages} >
          <Form.Item label="Name" >
            <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Genre" >
            <Input name="genre" value={formik.values.genre} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Platform" >
            <Input name="platform" value={formik.values.platform} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Image Url" >
            <Input name="image_url" value={formik.values.image_url} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Release Year:" >
            <Input style={{ width: '100%' }} name="release" value={formik.values.release} onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Game Type" >
            <Checkbox name="singlePlayer" checked={formik.values.singlePlayer} onChange={formik.handleChange}>Singleplayer</Checkbox>
            <Checkbox name="multiPlayer" checked={formik.values.multiPlayer} onChange={formik.handleChange}>multiPlayer</Checkbox>
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

export default GameEdit
