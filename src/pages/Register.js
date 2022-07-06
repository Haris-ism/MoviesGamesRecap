import { Input } from "antd"
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase-config"
const Register = () => {
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    }
  })
  const handleRegist = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(() => {
        alert("Registration Completed")
        history.push(`/login`)
      })
      .catch(err => {
        console.log(err.message)
        alert(err.message)
      })
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
