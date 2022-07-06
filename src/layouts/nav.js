import { Layout, Spin } from 'antd';
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { BrowserRouter as Router } from "react-router-dom";
import Headers from "./Headers"
import Section from "./Section"
import Sidebars from "./Sidebars"

const Nav = () => {
  const context = useContext(UserContext)
  const loader = context.loader
  return (
    <Spin size="large" spinning={loader}
      style={{ top: "20vh" }}>
      <Router>
        <Layout>
          <Headers />
          <Layout>
            <Sidebars className="desktop" />
            <Layout style={{ padding: '0 24px 24px' }}>
              <Section />
            </Layout>
          </Layout>
        </Layout>
      </Router>
    </Spin>
  )
}
export default Nav
