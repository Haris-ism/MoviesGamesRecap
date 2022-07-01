import React, {useState, useContext} from "react"
import {UserContext} from "../context/UserContext"
import axios from "axios"
import "./MobileAppsList.css"
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from 'antd';
const MovieForm = () => {
  const { TextArea } = Input;
  let initialForm = {
    description: "",
    duration: "",
    genre: "",
    image_url: "",
    rating: "",
    review: "",
    title: "",
    year: ""
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
      await axios.post(`https://614fdbbda706cd00179b7317.mockapi.io/movies`, {
        description: input.description,
        duration: parseInt(input.duration),
        genre: input.genre,
        image_url: input.image_url,
        rating: parseInt(input.rating),
        review: input.review,
        title: input.title,
        year: parseInt(input.year)
      },{headers: {"Authorization" : "Bearer "+ token}})
      .then(res => {
          setInput(initialForm)
          history.push(`/movie/edit`)
      })
    }
    submit()
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  return(
    <>
      <div style={{display:"flex", "justifyContent": "center",margin:"30px"}}>
      <Form {...layout} onFinish={handleSubmit}>
        <Form.Item  label="Title" >
          <Input name="title" value={input.title} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Genre" >
          <Input name="genre" value={input.genre} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Review" >
          <TextArea name="review" value={input.review} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Description" >
          <TextArea name="description" value={input.description} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Image Url" >
          <Input name="image_url" value={input.image_url} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Duration" >
          <Input style={{ width: '100%' }} type="number" name="duration" value={input.duration} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Year" >
          <Input style={{ width: '100%' }} type="number" name="year" value={input.year} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Rating" >
          <Input style={{ width: '100%' }} type="number" name="rating" value={input.rating} onChange={handleChange}/>
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
