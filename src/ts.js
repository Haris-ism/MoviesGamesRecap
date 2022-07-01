<Sider breakpoint="lg"
 onMouseEnter={toggle} onMouseLeave={toggle} width={200} className="site-layout-background" trigger={null} collapsible collapsed={collapsed}>

  <Menu
    mode="inline"
    style={{ height: '100%', borderRight: 0 }}
  >

    { user ?
      <>
      <SubMenu key="sub2"  icon={<UserOutlined />} title={user.name}>
        <Menu.Item key="4"><Link to="/ChangePassword">Change Password </Link></Menu.Item>
        <Menu.Item style={{cursor: "pointer"}} onClick={handleLogout}>Logout</Menu.Item>
      </SubMenu>
      <SubMenu key="sub3"  icon={<LaptopOutlined />} title="Editor">
        <Menu.Item key="2"><Link to="/game/edit">Game Editor </Link></Menu.Item>
        <Menu.Item key="3"><Link to="/movie/edit">Movie Editor </Link></Menu.Item>
      </SubMenu>
      </>
      :
      <>
      <Menu.Item key="5" icon={<UserOutlined />}><Link to="/login">Login </Link></Menu.Item>
      <Menu.Item key="9" icon={<LaptopOutlined />}> <Link to="/register">Register </Link></Menu.Item>
      </>
    }

  </Menu>
</Sider>
