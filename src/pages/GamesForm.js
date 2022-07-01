import React, {useState, useContext} from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext"
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
const GamesForm = () => {
  let initialForm = {
    genre: "",
    image_url: "",
    singlePlayer: true,
    multiplayer: true,
    name: "",
    platform: "",
    release: ""
  }
  const [user, setUser] = useContext(UserContext)
  const [input, setInput]  =  useState(initialForm)
  let token = user ?  user.token : null
  let history = useHistory();

  const handleChange = (event) =>{
    let typeOfInput = event.target.name
    let platform = ["singlePlayer", "multiplayer"]
    if (platform.indexOf(typeOfInput) < 0){
      setInput({...input, [typeOfInput]: event.target.value})
    }else{
      setInput({...input, [typeOfInput]: !input[typeOfInput]})
    }
  }

  const handleSubmit = (event) =>{
    const submit = async()=>{
      await axios.post(`https://614fdbbda706cd00179b7317.mockapi.io/games`, {
        genre: input.genre,
        image_url: input.image_url,
        singlePlayer: input.singlePlayer,
        multiplayer: input.multiplayer,
        name: input.name,
        platform: input.platform,
        release: input.release
      },{headers: {"Authorization" : "Bearer "+ token}})
      history.push(`/game/edit`)
    }
    submit()
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return(
    <>
      <div style={{display:"flex", "justifyContent": "center",margin:"30px"}}>
      <Form {...layout} onFinish={handleSubmit}>
        <Form.Item  label="Name" >
          <Input name="name" value={input.name} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Genre" >
          <Input name="genre" value={input.genre} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Platform" >
          <Input name="platform" value={input.platform} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Image Url" >
          <Input name="image_url" value={input.image_url} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Release Year:" >
          <Input style={{ width: '100%' }} type="number" name="release" value={input.release} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Game Type" >
          <Checkbox name="singlePlayer" checked={input.singlePlayer} onChange={handleChange}>Singleplayer</Checkbox>
          <Checkbox name="multiplayer" checked={input.multiplayer} onChange={handleChange}>Multiplayer</Checkbox>
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
