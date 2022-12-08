import { useContext } from "react"
import { Menu, Dropdown } from 'antd';
import { UserOutlined, LaptopOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const Headers = () => {
  let history = useHistory();
  const context = useContext(UserContext)
  const userId = localStorage.getItem('userId')
  context.setUser(userId)
  const user = localStorage.getItem('userId')
  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    context.setUser(null)
    history.push(`/`)
  }
  const menu = (
    <>
      {user ?
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item icon={<LaptopOutlined />}><Link to="/game/edit">Game Editor </Link></Menu.Item>
          <Menu.Item icon={<LaptopOutlined />}><Link to="/movie/edit">Movie Editor </Link></Menu.Item>
          <Menu.Item icon={<UserOutlined />}><Link to="/ChangePassword">Change Password </Link></Menu.Item>
          <Menu.Item icon={<UserOutlined />} style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
        :
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item icon={<UserOutlined />}><Link to="/login">Login </Link></Menu.Item>
          <Menu.Item icon={<LaptopOutlined />}> <Link to="/register">Register </Link></Menu.Item>
        </Menu>
      }
    </>
  )

  return (
    <>
      <div style={{ height: "50px", display: "grid", gridTemplateColumns: "80px auto 80px 80px 80px 80px", backgroundColor: "rgba(0, 45, 97,1)" }}>
        <div className="antihamburger" style={{ color: "white" }}>{user && `Welcome ${user}!`}</div>
        <div style={{ padding: "12px" }}>
          <div className="hamburger">
            <Dropdown overlay={menu} trigger={['click']}>
              <MenuOutlined />
            </Dropdown>
          </div>
        </div>
        <div>
        </div>
        <div style={{ padding: "12px", textAlign: "center" }}>
          <Link style={{ color: "rgba(235, 235, 235,0.7)" }} to="/">Home</Link>
        </div>
        <div style={{ padding: "12px", textAlign: "center" }}>
          <Link style={{ color: "rgba(235, 235, 235,0.7)" }} to="/movie">Movie</Link>
        </div>
        <div style={{ padding: "12px", textAlign: "center" }}>
          <Link style={{ color: "rgba(235, 235, 235,0.7)" }} to="/game">Game</Link>
        </div>
        <div style={{ padding: "12px", textAlign: "center" }}>
          <Link style={{ color: "rgba(235, 235, 235,0.7)" }} to="/about">About</Link>
        </div>
      </div>
    </>
  )
}
export default Headers
