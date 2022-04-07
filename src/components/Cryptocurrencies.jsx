import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoAPI';
import Loader from './Loader';


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);
  }, [cryptoList, searchTerm])

  if(isFetching) return <Loader/>;

  console.log(cryptos);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrencies" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-conatiner" justify='center'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} md={8} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} alt="icon"/>} hoverable>
                <p>Price: <b>${millify(currency.price)}</b></p>
                <p>Market Cap: <b>{millify(currency.marketCap)}</b></p>
                <p>Daily Change: <b>{millify(currency.change)}%</b></p>
              </Card>  
            </Link>
          </Col>
        ))}  
      </Row>
    </>
  )
}

export default Cryptocurrencies;