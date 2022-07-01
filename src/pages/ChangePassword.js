import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import {Button, Input} from "antd"
import axios from "axios"

const ChangePassword = () =>{
  const [user, setUser] = useContext(UserContext)
  const [input, setInput] = useState({current_password: "" , new_password: "", new_confirm_password: ""})
  let token = user ?  user.token : null
  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post("https://backendexample.sanbersy.com/api/change-password", {
      current_password: input.current_password,
      new_password: input.new_password,
      new_confirm_password: input.new_confirm_password
    },{headers: {"Authorization" : "Bearer "+ token}}).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {
          current_password: input.current_password,
          new_password: input.new_password,
          new_confirm_password: input.new_confirm_password
        }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        alert("Password Has Been Changed")
      }
    ).catch((err)=>{
      alert(JSON.stringify(err.response.data))
    })
  }



  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    setInput({...input, [name]: value})
  }

  return(
    <>
      <div style={{margin: "0 auto", width: "400px", padding: "50px"}}>
        <form>
          <label>Current Password: </label>
          <Input type="password" name="current_password" onChange={handleChange} value={input.current_password}/>
          <br/>
          <label>New Password: </label>
          <Input type="password" name="new_password" onChange={handleChange} value={input.new_password}/>
          <label>Confirm New Password: </label>
          <Input type="password" name="new_confirm_password" onChange={handleChange} value={input.new_confirm_password}/>
          <br/>
          <br/>
          <br/>
          <Button onClick={handleSubmit}>Login</Button>
        </form>
      </div>
    </>
  )
}

export default ChangePassword
