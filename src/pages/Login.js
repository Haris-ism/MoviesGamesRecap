import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Button, Input } from "antd"
import { useFormik } from 'formik'
import { login } from '../services'
const Login = () => {
  const context = useContext(UserContext)
  const setUser = context.setUser
  const setLoader = context.setLoader
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    }
  })
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const result = await login(formik.values)
      localStorage.setItem('userId', result.data.data.login.user)
      localStorage.setItem('token', result.data.data.login.token)
      setUser(result.data.data.login.user)
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoader(false)
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
          <Button onClick={handleLogin}>Login</Button>
        </form>
      </div>
    </>
  )
}

export default Login
