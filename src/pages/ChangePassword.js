import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Button, Input } from "antd"
import { useFormik } from 'formik'
import { getAuth, updatePassword } from "firebase/auth";
const ChangePassword = () => {
  const [, setUser, loader, setLoader] = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    }
  })
  const account = getAuth().currentUser;
  const handleSubmit = async (event) => {
    setLoader(true)
    event.preventDefault()
    if (formik.values.newPassword === formik.values.confirmNewPassword) {
      await updatePassword(account, formik.values.newPassword)
        .then(() => alert("success"))
        .catch(err => alert(err.message))
    } else alert("Password Don't Match")
    setLoader(false)
  }
  return (
    <>
      <div style={{ margin: "0 auto", width: "400px", padding: "50px" }}>
        <form>
          <label>New Password: </label>
          <Input type="password" name="newPassword" onChange={formik.handleChange} value={formik.values.newPassword} />
          <label>Confirm New Password: </label>
          <Input type="password" name="confirmNewPassword" onChange={formik.handleChange} value={formik.values.confirmNewPassword} />
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
