import React, { useContext } from "react"
import { Menu, Dropdown } from 'antd';
import { UserOutlined, LaptopOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Headers = () =>{
  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.clear()
  }
  const menu = (
    <>
    { user ?
      <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item icon={<LaptopOutlined />}><Link to="/game/edit">Game Editor </Link></Menu.Item>
        <Menu.Item icon={<LaptopOutlined />}><Link to="/movie/edit">Movie Editor </Link></Menu.Item>
        <Menu.Item icon={<UserOutlined />}><Link to="/ChangePassword">Change Password </Link></Menu.Item>
        <Menu.Item icon={<UserOutlined />}style={{cursor: "pointer"}} onClick={handleLogout}>Logout</Menu.Item>
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
      <div style={{height:"50px",display:"grid",gridTemplateColumns:"80px auto 80px 80px 80px 80px",backgroundColor:"rgba(0, 45, 97,1)"}}>
      <div style={{padding:"12px"}}>
        <div className="hamburger">
        <Dropdown overlay={menu} trigger={['click']}>
          <MenuOutlined/>
        </Dropdown>
        </div>
      </div>
        <div>
        </div>
        <div style={{padding:"12px",textAlign:"center"}}>
        <Link style={{color:"rgba(235, 235, 235,0.7)"}} to="/">Home</Link>
        </div>
        <div style={{padding:"12px",textAlign:"center"}}>
        <Link style={{color:"rgba(235, 235, 235,0.7)"}}to="/movie">Movie</Link>
        </div>
        <div style={{padding:"12px",textAlign:"center"}}>
        <Link style={{color:"rgba(235, 235, 235,0.7)"}}to="/game">Game</Link>
        </div>
        <div style={{padding:"12px",textAlign:"center"}}>
        <Link style={{color:"rgba(235, 235, 235,0.7)"}}to="/about">About</Link>
        </div>
      </div>
    </>
  )
}
export default Headers
