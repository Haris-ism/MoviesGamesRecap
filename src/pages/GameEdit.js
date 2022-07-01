import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import { Form, Input, InputNumber, Button,Checkbox,Image } from 'antd';
import {UserContext} from "../context/UserContext"
import { useParams, useHistory } from "react-router-dom";
const GameEdit = () => {
  const [user, setUser] = useContext(UserContext)
  let { id } = useParams();
  let history = useHistory();
  const [name, setname] = useState("")
  const [genre, setgenre] = useState("")
  const [image_url, setimage_url] = useState("")
  const [singlePlayer,setsinglePlayer] = useState(null)
  const [multiplayer, setmultiplayer] = useState(null)
  const [platform, setplatform] = useState("")
  const [release, setrelease] = useState("")
  let token = user ?  user.token : null
  console.log({id});
  useEffect( () => {
    const fetchData = async ()=>{
      const result = await axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/games/${id}`)
      setname(result.data.name)
      setgenre(result.data.genre)
      setimage_url(result.data.image_url)
      setsinglePlayer(result.data.singlePlayer)
      setmultiplayer(result.data.multiplayer)
      setplatform(result.data.platform)
      setrelease(result.data.release)
    }
    fetchData()
  }, [])

  const handleSubmit = (event) =>{
    const submit = async ()=>{
      await axios.put(`https://614fdbbda706cd00179b7317.mockapi.io/games/${id}`, {name: name, genre: genre, image_url: image_url, platform: platform, release: release,
      singlePlayer: singlePlayer, multiplayer: multiplayer},{headers: {"Authorization" : "Bearer "+ token}})
      history.push(`/game/edit`)
    }
    submit()
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

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
  return(
    <>
      <div style={{display:"flex", "justifyContent": "center",margin:"30px"}}>
      <Form {...layout} onFinish={handleSubmit} validateMessages={validateMessages} >
        <Form.Item  label="Name" >
          <Input name="name" value={name} onChange={(e)=>setname(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Genre" >
          <Input name="genre" value={genre} onChange={(e)=>setgenre(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Platform" >
          <Input name="platform" value={platform} onChange={(e)=>setplatform(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Image Url" >
          <Input name="image_url" value={image_url} onChange={(e)=>setimage_url(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Release Year:" >
          <InputNumber style={{ width: '100%' }} name="release" value={release} onChange={(e)=>setrelease(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Game Type" >
          <Checkbox name="singlePlayer" checked={singlePlayer} onChange={(e)=>setsinglePlayer(e.target.checked)}>Singleplayer</Checkbox>
          <Checkbox name="multiplayer" checked={multiplayer} onChange={(e)=>setmultiplayer(e.target.checked)}>Multiplayer</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div style={{"marginLeft":"10px"}}>
      <Image width={200} src={image_url} />
      </div>
      </div>
    </>
  )
}

export default GameEdit
