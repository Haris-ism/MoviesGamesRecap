import { useContext, useState } from "react"
import { Menu, Layout } from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const { SubMenu } = Menu;
const { Sider } = Layout;
const Sidebars = () => {
  let history = useHistory();
  const context = useContext(UserContext)
  const user = context.user
  const setUser = context.setUser
  const [sidebar, setSidebar] = useState(true)
  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    setUser(null)
    history.push(`/`)
  }
  const toggleIn = () => {
    setSidebar(false)
  }
  const toggleOut = () => {
    setSidebar(true)
  }
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
