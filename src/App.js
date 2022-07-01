import React from 'react';
import Nav from './layouts/nav';
import './App.css';
import {UserProvider} from "./context/UserContext"
import 'antd/dist/antd.css';

function App() {
  return (
    <>
      <UserProvider>
        <Nav/>
      </UserProvider>
    </>
  );
}

export default App;
