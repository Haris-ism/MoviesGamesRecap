import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import {Button, Input} from "antd"
import axios from "axios"

const Login = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({email: "" , password: ""})
  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: input.email,
      password: input.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
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
          <label>Email: </label>
          <Input type="email" name="email" onChange={handleChange} value={input.email}/>
          <br/>
          <label>Password: </label>
          <Input type="password" name="password" onChange={handleChange} value={input.password}/>
          <br/>
          <br/>
          <Button onClick={handleSubmit}>Login</Button>
        </form>
      </div>
    </>
  )
}

export default Login
