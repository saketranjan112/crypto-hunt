import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Divider } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoAPI';
import { Cryptocurrencies, News } from './';
import Loader from './Loader';

const Homepage = () => {

  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if(isFetching) return <Loader/>;

  return (
    <div>
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      <Divider/>
      <Row gutter={[16, 16]}justify='center' >
        <Col xs={24} sm={12} md={8} lg={4} style={{textAlign: 'center'}}><Statistic title="Total Cryptocurrencies" value={millify(globalStats.totalCoins)} /></Col>
        <Col xs={24} sm={12} md={8} lg={4} style={{textAlign: 'center'}}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col xs={24} sm={12} md={8} lg={4} style={{textAlign: 'center'}}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col xs={24} sm={12} md={8} lg={4} style={{textAlign: 'center'}}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col xs={24} sm={12} md={8} lg={4} style={{textAlign: 'center'}}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <Divider/>
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">Top 10 Crypto-Currencies in the World</Typography.Title>
      </div>
      <Divider/>
      <Cryptocurrencies simplified/>
      <Typography.Title level={4} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Typography.Title>
      <Divider/>
      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">Latest Crypto News</Typography.Title>
      </div>
      <Divider/>
      <News simplified/>
      <Typography.Title level={4} className="show-more"><Link to="/news">Show more</Link></Typography.Title>
    </div>
  )
}

export default Homepage