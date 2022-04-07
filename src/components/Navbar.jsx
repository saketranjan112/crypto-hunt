import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        if(screenSize < 768){
            setActiveMenu(false);
        }else{
            setActiveMenu(true);
        }
    }, [screenSize])
  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size='large'/>
            <Typography.Title level={3} className='logo'>
                <Link style={{color: 'rgb(14, 231, 141)', marginBottom: 0}} to='/'>CryptoHunt</Link>
                <div style={{color: 'white', fontSize: '0.6rem', fontStyle: 'italic', marginTop: 0}}>A beginner's guide to the world of crypto</div>
            </Typography.Title>
            <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                <MenuOutlined/>    
            </Button>
        </div>
        {activeMenu && (
            <Menu mode="horizontal" theme="dark" style={{backgroundColor: '#001529', border: 0, padding: 10, marginTop: 10}}>
                    <Menu.Item className="menu-item" icon={<HomeOutlined/>} key='home'>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" icon={<FundOutlined/>} key='coins'>
                        <Link to='/cryptocurrencies'>Currencies</Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" icon={<MoneyCollectOutlined/>} key='exchanges'>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" icon={<BulbOutlined/>} key='news'>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
            </Menu> 
        )}
    </div>
  )
}

export default Navbar