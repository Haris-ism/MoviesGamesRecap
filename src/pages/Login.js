import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Button, Input } from "antd"
import { useFormik } from 'formik'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase-config"
const Login = () => {
  const [, setUser, loader, setLoader] = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    }
  })
  const handleLogin = async () => {
    setLoader(true)
    await signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(() => {
        alert("Logged In")
      })
      .catch(err => {
        console.log(err.message)
        alert(err.message)
      })
    setLoader(false)
  }
  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser?.email)
  })
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
