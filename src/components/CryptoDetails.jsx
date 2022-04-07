import React, {useState} from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, ThunderboltOutlined, NumberOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoAPI';
import LineChart from './LineChart';
import Loader from './Loader';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod});
  const cryptoDetails = data?.data?.coin;
  console.log(cryptoDetails);

  if (isFetching) return <Loader/>;

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const stats = [
    { title: 'Price in USD', value: `$${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: cryptoDetails.supply.total ? `$${millify(cryptoDetails.supply.total)}` : 'NA', icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-conatiner">
      <Col className="coin-heading-container">
        <Typography.Title level={2} className="coin-name">{cryptoDetails.name} ({cryptoDetails.symbol})</Typography.Title>
        <p style={{marginBottom: 0, textAlign: 'center'}}>
          {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.
        </p>
      </Col>
      <Select className="select-timeperiod" defaultValue="7d" placeholder="Select Time Period" onChange={(value) => setTimePeriod(value)}>
        {time.map((interval) => <Select.Option key={interval}>{interval}</Select.Option>)}  
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} interval={timePeriod}/>
      <Row gutter={[32, 16]} justify="space-between" className="stats-conatiner">
        <Col xs={24} md={12} className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics  
            </Typography.Title>
            <p>
              
            </p>
          </Col>
          {stats.map(({ icon, title, value}, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))} 
        </Col>
        <Col xs={24} md={12} className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">
              Other Statistics 
            </Typography.Title>
            <p>
              
            </p>
          </Col>
          {genericStats.map(({ icon, title, value}, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))} 
        </Col>  
      </Row>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Typography.Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?  
          </Typography.Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Typography.Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Typography.Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Typography.Title level={5} className="link-name">
                {link.type}  
              </Typography.Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a> 
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails