import { useEffect, useContext } from "react"
import { Form, Input, InputNumber, Button, Checkbox, Image } from 'antd';
import { UserContext } from "../context/UserContext"
import { useParams, useHistory } from "react-router-dom";
import { getDataGame, putDataGame } from '../services'
import { useFormik } from 'formik'
const GameEdit = () => {
  const [user, setUser] = useContext(UserContext)
  let { id } = useParams();
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      genre: "",
      image_url: "",
      singlePlayer: "",
      multiplayer: "",
      platform: "",
      release: 0
    }
  })
  const handleGet = () => {
    getDataGame(id)
      .then(result => {
        formik.setValues({
          name: result.data.name,
          genre: result.data.genre,
          image_url: result.data.image_url,
          singlePlayer: result.data.singlePlayer,
          multiplayer: result.data.multiplayer,
          platform: result.data.platform,
          release: result.data.release
        })
      })
      .catch(err => console.log("error:", err.message))
  }
  useEffect(() => {
    handleGet()
  }, [])

  const handleSubmit = () => {
    putDataGame(id, {
      name: formik.values.name,
      genre: formik.values.genre,
      image_url: formik.values.image_url,
      platform: formik.values.platform,
      release: formik.values.release,
      singlePlayer: formik.values.singlePlayer,
      multiplayer: formik.values.multiplayer
    })
      .then(() => {
        alert("Edit Success")
        history.push(`/game/edit`)
      })
      .catch(err => console.log(err.message))
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
            <Checkbox name="multiplayer" checked={formik.values.multiplayer} onChange={formik.handleChange}>Multiplayer</Checkbox>
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
