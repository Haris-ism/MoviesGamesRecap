import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Input } from "antd"
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik'
import { registration } from '../services'
const Register = () => {
  const context = useContext(UserContext)
  const setLoader = context.setLoader
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    }
  })
  const handleRegist = async (e) => {
    setLoader(true)
    e.preventDefault()
    try {
      await registration(formik.values)
      alert("Registration Completed")
      history.push(`/login`)
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
          <strong style={{ display: "inline-block" }}>Email: </strong>
          <Input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
          <br />
          <strong style={{ display: "inline-block" }}>Password: </strong>
          <Input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
          <br />
          <br />
          <button onClick={handleRegist}>Register</button>
        </form>
      </div>
    </>
  )
}

export default Register
