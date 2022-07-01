import React, { useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { StarTwoTone,ClockCircleTwoTone } from '@ant-design/icons'
import { Image } from 'antd'
import star from './star.png'
const MovieDetail = ()=>{
  let { id } = useParams();
  const [title, settitle] = useState("")
  const [rating, setrating] = useState("")
  const [genre, setgenre] = useState("")
  const [image_url, setimage_url] = useState("")
  const [duration,setduration] = useState("")
  const [year, setyear] = useState("")
  const [review, setreview] = useState("")
  const [description, setdescription] = useState("")
  useEffect( () => {
    const fetchData = async ()=>{
      const result = await axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/movies/${id}`)
      settitle(result.data.title)
      setgenre(result.data.genre)
      setimage_url(result.data.image_url)
      setduration(result.data.duration)
      setyear(result.data.year)
      setreview(result.data.review)
      setdescription(result.data.description)
      setrating(result.data.rating)
    }
    fetchData()
  }, [])

  return (
    <>
      <div id="article-list">
        <div style={{display: "flex","margin-top":"20px"}}>
          <Image src={image_url} style={{width:"300px",height: "400px", objectFit: "cover","borderRadius": "15px"}}/>
          <div style={{float: "left", "fontSize": "20px", padding: "10px", top: 0}}>
            <h3 style={{"fontSize": "30px"}}>{title} ({year})</h3>
            <div style={{"fontSize": "23px"}}>({rating}) <img src={star} style={{width:"1.2em"}}/><StarTwoTone /><StarTwoTone />
              | <ClockCircleTwoTone /> {duration} Minutes | {genre}</div><br/>
            <div >Description:</div>
            <div>{description}</div>
            <br/>
            <div>Review:</div>
            <div>{review}</div>
          </div>
        </div>
      </div>

    </>
  )
}

export default MovieDetail
