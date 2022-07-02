import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Input } from "antd"
import { registration } from '../services.js'
import { useFormik } from 'formik'
const Register = () => {
  const [, setUser] = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    }
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    registration(formik.values)
      .then((res) => {
        let user = res.data.user
        let token = res.data.token
        let currentUser = { name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        alert("Registration Success")
      })
      .catch((err) => {
        alert(JSON.stringify(err.response.data))
      })
  }
  return (
    <>
      <div style={{ margin: "0 auto", width: "400px", padding: "50px" }}>
        <form onSubmit={handleSubmit}>
          <strong style={{ display: "inline-block" }}>Name: </strong>
          <Input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
          <br />
          <strong style={{ display: "inline-block" }}>Email: </strong>
          <Input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
          <br />
          <strong style={{ display: "inline-block" }}>Password: </strong>
          <Input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
          <br />
          <br />
          <button>Register</button>
        </form>
      </div>
    </>
  )
}

export default Register
