import React, { useState, useEffect } from 'react';
import axios from 'axios';
import millify from 'millify';
import { Row, Col, Typography, Avatar, Divider } from 'antd';
// import HTMLReactParser from 'html-react-parser';
import Loader from './Loader';

const Exchanges = () => {
  const [exchangeData, setExchangeData] = useState();
  useEffect(() => {
    async function fetchData(){
      const response = await axios.get('https://api.coingecko.com/api/v3/exchanges');
      setExchangeData(response.data);
    }
    fetchData();
  }, [])

  if (!exchangeData) return <Loader/>;
  return (
    <>
      <Row justify="space-around" align="middle" style={{marginTop: 20}}>
        <Col span={14} align="center"><Typography.Title level={4}>Exchanges</Typography.Title></Col>
        <Col span={6} align="center"><Typography.Title level={4}>24h Trade Volume</Typography.Title></Col>
      </Row>
      <Divider style={{backgroundColor: 'gray'}}/>
      <br/>
      <Row align="middle">
        {exchangeData.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <a href={exchange.url} target="_blank" rel="noreferrer">
                  <Row className="coin-link" justify="space-around" align="middle">
                    <Col span={16}>
                      <Row gutter={[8, 0]}>
                        <Col span={4}>
                          <Typography.Text><strong>{exchange.trust_score_rank}.</strong></Typography.Text>
                        </Col>
                        <Col span={6}>
                          <Avatar className="exchange-image" src={exchange.image} />
                        </Col>
                        <Col span={14}>
                          <Typography.Text><strong>{exchange.name}</strong></Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={8} align="center"><strong style={{color: '#001529'}}>${millify(exchange.trade_volume_24h_btc)}</strong></Col>
                  </Row>
             </a>     
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges