import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import {UserContext} from "../context/UserContext"
import { Form, Input, Button, Image } from 'antd';
import { useParams, useHistory } from "react-router-dom";
const MovieEdit = () => {
  const { TextArea } = Input
  const [user, setUser] = useContext(UserContext)
  let { id } = useParams()
  let history = useHistory()
  const [title, settitle] = useState("")
  const [genre, setgenre] = useState("")
  const [image_url, setimage_url] = useState("")
  const [description,setdescription] = useState(null)
  const [duration, setduration] = useState(null)
  const [rating, setrating] = useState("")
  const [review, setreview] = useState("")
  const [year, setyear] = useState("")
  let token = user ?  user.token : null
  useEffect( () => {
    const fetchData = async ()=>{
      const result = await axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/movies/${id}`)
      settitle(result.data.title)
      setgenre(result.data.genre)
      setimage_url(result.data.image_url)
      setdescription(result.data.description)
      setduration(result.data.duration)
      setrating(result.data.rating)
      setreview(result.data.review)
      setyear(result.data.year)
    }
    fetchData()
  }, [])

  const handleSubmit = (event) =>{
    const submit = async ()=>{
      await axios.put(`https://614fdbbda706cd00179b7317.mockapi.io/movies/${id}`, {title: title, genre: genre, image_url: image_url, rating: rating, review: review,
      description: description, duration: duration, year: setyear},{headers: {"Authorization" : "Bearer "+ token}})
      history.push(`/movie/edit`)
    }
    submit()
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
  return(
    <>
      <div style={{display:"flex", "justifyContent": "center",margin:"30px"}}>
        <Form {...layout} onFinish={handleSubmit} validateMessages={validateMessages} >
          <Form.Item  label="Title" >
            <Input name="title" value={title} onChange={(e)=>settitle(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Genre" >
            <Input name="genre" value={genre} onChange={(e)=>setgenre(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Rating" >
            <Input name="rating" value={rating} onChange={(e)=>setrating(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Image Url" >
            <Input name="image_url" value={image_url} onChange={(e)=>setimage_url(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Review" >
            <TextArea name="review" value={review} onChange={(e)=>setreview(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Description" >
            <TextArea name="description" value={description} onChange={(e)=>setdescription(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Duration" >
            <Input name="duration" value={duration} onChange={(e)=>setduration(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Year" >
            <Input type="number" name="year" value={year} onChange={(e)=>setyear(e.target.value)}/>
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

export default MovieEdit
