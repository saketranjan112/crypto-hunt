import React from 'react';
import {Routes, Route, Link } from 'react-router-dom';
import { Layout, Space, Divider } from 'antd';
import { LinkedinOutlined, InstagramOutlined, GithubOutlined } from '@ant-design/icons';

import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components';
import './App.css';

const App = () => {
    console.log(process.env);
  return (
    <div className="app">
        <div className="navbar">
            <Navbar/>
        </div>
        <div className="main">
            <Layout>
                <div className="routes">
                    <Routes>
                        <Route exact path="/" element={<Homepage/>}/>
                        <Route exact path="/exchanges" element={<Exchanges/>}/>
                        <Route exact path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
                        <Route exact path="/crypto/:coinId" element={<CryptoDetails/>}/>
                        <Route exact path="/news" element={<News/>}/>
                    </Routes>
                </div>
            </Layout>
        </div>
        <div className="footer">
            <Space>
                <Link to="/">Home</Link> &nbsp;&nbsp;
                <Link to="/cryptocurrencies">Currencies</Link> &nbsp;&nbsp;
                <Link to="/exchanges">Exchanges</Link> &nbsp;&nbsp;
                <Link to="/news">News</Link>
            </Space>
            <Divider style={{borderColor: "white"}}/>
            <div className="copyright">
                <div>
                    &copy; 2022 Saket Ranjan. Some rights reserved.
                </div>
                <div style={{fontSize: "1.2rem"}}>
                    <a href="https://linkedin.com/in/saketranjan112" target="_blank" rel="noreferrer" ><LinkedinOutlined/></a> &nbsp;&nbsp;
                    <a href="https://github.com/saketranjan112" target="_blank" rel="noreferrer" ><GithubOutlined/></a> &nbsp;&nbsp;
                    <a href="https://instagram.com/saketspeare" target="_blank" rel="noreferrer" ><InstagramOutlined/></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App