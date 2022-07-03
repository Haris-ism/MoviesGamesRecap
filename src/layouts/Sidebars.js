import { useContext, useState } from "react"
import { Menu, Layout } from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase-config"
const { SubMenu } = Menu;
const { Sider } = Layout;
const Sidebars = () => {
  const [user, setUser] = useContext(UserContext)
  const [sidebar, setSidebar] = useState(true)
  const handleLogout = () => {
    signOut(auth)
    alert("You're Logged Out")
  }
  const toggleIn = () => {
    setSidebar(false)
  }
  const toggleOut = () => {
    setSidebar(true)
  }
  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser?.email)
  })
  return (
    <>
      <div className="desktop">
        <Sider onMouseEnter={toggleIn} onMouseLeave={toggleOut} width={200}
          className="site-layout-background" trigger={null}
          collapsible collapsedWidth={80} collapsed={sidebar}>
          <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
            {
              user ?
                <>
                  <SubMenu icon={<UserOutlined />} title={user}>
                    <Menu.Item ><Link to="/ChangePassword">Change Password </Link></Menu.Item>
                    <Menu.Item style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</Menu.Item>
                  </SubMenu>
                  <SubMenu icon={<LaptopOutlined />} title="Editor">
                    <Menu.Item ><Link to="/game/edit">Game Editor </Link></Menu.Item>
                    <Menu.Item ><Link to="/movie/edit">Movie Editor </Link></Menu.Item>
                  </SubMenu>
                </>
                :
                <>
                  <Menu.Item icon={<UserOutlined />}><Link to="/login">Login </Link></Menu.Item>
                  <Menu.Item icon={<LaptopOutlined />}> <Link to="/register">Register </Link></Menu.Item>
                </>
            }
          </Menu>
        </Sider>
      </div>
    </>
  )
}
export default Sidebars
