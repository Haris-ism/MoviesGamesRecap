import React from "react"
import { Layout } from 'antd';
import { BrowserRouter as Router } from "react-router-dom";
import Headers from "./Headers"
import Section from "./Section"
import Sidebars from "./Sidebars"
import Class from "../pages/class"
import Games from "../pages/Games"

const Nav = () =>{
return (
  <Router>
  <Layout>
    <Headers/>
    <Layout>
      <Sidebars className="desktop"/>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Section/>
      </Layout>
    </Layout>
  </Layout>
  </Router>
)
}
export default Nav
