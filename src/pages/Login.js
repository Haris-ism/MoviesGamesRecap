import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Button, Input } from "antd"
import { login } from '../services.js'
import { useFormik } from 'formik'
const Login = () => {
  const [, setUser] = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    }
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    login(formik.values)
      .then((res) => {
        let user = res.data.user
        let token = res.data.token
        let currentUser = { name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data))
      })
  }
  return (
    <>
      <div style={{ margin: "0 auto", width: "400px", padding: "50px" }}>
        <form>
          <label>Email: </label>
          <Input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
          <br />
          <label>Password: </label>
          <Input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
          <br />
          <br />
          <Button onClick={handleSubmit}>Login</Button>
        </form>
      </div>
    </>
  )
}

export default Login
