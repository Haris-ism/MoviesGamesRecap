import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { useFormik } from 'formik'
import { postDataGame } from '../services'
const GamesForm = () => {
  const context = useContext(UserContext)
  const user = context.user
  const formik = useFormik({
    initialValues: {
      name: "",
      genre: "",
      image_url: "",
      singlePlayer: false,
      multiplayer: false,
      platform: "",
      release: ""
    }
  })
  let history = useHistory();
  const handleSubmit = () => {
    postDataGame({
      genre: formik.values.genre,
      image_url: formik.values.image_url,
      singlePlayer: formik.values.singlePlayer,
      multiplayer: formik.values.multiplayer,
      name: formik.values.name,
      platform: formik.values.platform,
      release: formik.values.release
    })
      .then(() => {
        alert("Create Success")
        history.push(`/game/edit`)
      })
      .catch(err => console.log(err.message))
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <div style={{ display: "flex", "justifyContent": "center", margin: "30px" }}>
        <Form {...layout} onFinish={handleSubmit}>
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
            <Input style={{ width: '100%' }} type="number" name="release" value={formik.values.release} onChange={formik.handleChange} />
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
      </div>
    </>
  )
}

export default GamesForm
