import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Button, Input } from "antd"
import { changePassword } from '../services.js'
import { useFormik } from 'formik'
const ChangePassword = () => {
  const [user, setUser] = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    }
  })
  let token = user ? user.token : null
  const handleSubmit = (event) => {
    event.preventDefault()
    changePassword({
      current_password: formik.values.currentPassword,
      new_password: formik.values.newPassword,
      new_confirm_password: formik.values.confirmNewPassword
    }, { headers: { "Authorization": "Bearer " + token } })
      .then(() => {
        let currentUser = {
          current_password: formik.values.currentPassword,
          new_password: formik.values.newPassword,
          new_confirm_password: formik.values.confirmNewPassword
        }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        alert("Password Has Been Changed")
      }
      ).catch((err) => {
        alert(err.message)
      })
  }
  return (
    <>
      <div style={{ margin: "0 auto", width: "400px", padding: "50px" }}>
        <form>
          <label>Current Password: </label>
          <Input type="password" name="currentPassword" onChange={formik.handleChange} value={formik.values.currentPassword} />
          <br />
          <label>New Password: </label>
          <Input type="password" name="newPassword" onChange={formik.handleChange} value={formik.values.newPassword} />
          <label>Confirm New Password: </label>
          <Input type="password" name="confirmNewPassword" onChange={formik.handleChange} value={formik.values.confirmNewPassword} />
          <br />
          <br />
          <br />
          <Button onClick={handleSubmit}>Login</Button>
        </form>
      </div>
    </>
  )
}

export default ChangePassword
