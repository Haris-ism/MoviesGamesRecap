import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from "axios"
import { Image } from 'antd';
const GameDetail = ()=>{
  let { id } = useParams();
  const [name, setname] = useState("")
  const [genre, setgenre] = useState("")
  const [image_url, setimage_url] = useState("")
  const [singlePlayer,setsinglePlayer] = useState("")
  const [multiplayer, setmultiplayer] = useState("")
  const [platform, setplatform] = useState("")
  const [release, setrelease] = useState("")
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
  return (
    <>
      <div id="article-list">
        <div style={{display: "flex","margin-top":"20px"}}>
          <Image src={image_url} style={{width:"300px",height: "400px", objectFit: "cover","borderRadius": "15px"}}/>
          <div style={{float: "left", "fontSize": "20px", padding: "10px", top: 0, display: "inline-block" }}>
            <h3 style={{"fontSize": "30px"}}>{name} ({release})</h3>
            <div>{singlePlayer ? `Singleplayer` : ''} {multiplayer ? `Multiplayer` : ''}</div><br/>
            <div>Genre:</div>
            <div>{genre}</div><br/>
            <div>Platform:</div>
            <div>{platform}</div>
            </div>
        </div>
      </div>
    </>
  )
}

export default GameDetail
