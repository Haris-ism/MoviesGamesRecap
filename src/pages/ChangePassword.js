import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Button, Input } from "antd"
import { useFormik } from 'formik'
import { changePassword } from '../services'
const ChangePassword = () => {
  const context = useContext(UserContext)
  const setLoader = context.setLoader
  const user = context.user
  const token = localStorage.getItem('token')
  const formik = useFormik({
    initialValues: {
      email: user,
      newPassword: "",
      confirmPassword: ""
    }
  })
  const handleSubmit = async (event) => {
    setLoader(true)
    event.preventDefault()
    try {
      if (formik.values.newPassword !== formik.values.confirmPassword) {
        throw new Error("Password Don't Match")
      }
      await changePassword(formik.values, token)
      alert("Password Changed")
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
      setLoader(false)
    }
    setLoader(false)
  }
  return (
    <>
      <div style={{ margin: "0 auto", width: "400px", padding: "50px" }}>
        <form>
          <label>New Password: </label>
          <Input type="password" name="newPassword" onChange={formik.handleChange} value={formik.values.newPassword} />
          <label>Confirm New Password: </label>
          <Input type="password" name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} />
          <br />
          <br />
          <br />
          <Button onClick={handleSubmit}>Change Password</Button>
        </form>
      </div>
    </>
  )
}

export default ChangePassword
