import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { Chart as ChartJS, CategoryScale, TimeScale ,LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend );

const LineChart = ({ coinHistory, currentPrice, coinName, interval }) => {
    const coinPrice = [];
    const coinTimeStamp = [];

    // const dateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour12: false, timeStyle: 'short' };

    for(let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }
        // console.log(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString(), coinHistory.data.history[i].price);

    let filterIndex = 0;
    if(interval === '3h'){
        filterIndex = 4;
        for(let i = 0; i < coinHistory?.data?.history?.length; i++){
            coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleTimeString());
        }
    }else if(interval === '24h' || interval === '7d'){
        filterIndex = 8;
        for(let i = 0; i < coinHistory?.data?.history?.length; i++){
            coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleString('en-IN', { hour12: false , day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'}));
        }
    }else{
        filterIndex = 4;
        for(let i = 0; i < coinHistory?.data?.history?.length; i++){
            coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: '2-digit'}));
        }
    }
        
    

    const data = {
        labels: coinTimeStamp.reverse(),
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice.reverse(),
                fill: true,
                backgroundColor: 'rgba(14, 231, 141, 0.4)',
                borderColor: '#001529',
                borderWidth: 2,
                pointRadius: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            x:{
                ticks: {
                    source: 'auto',
                    //maxRotation: 0,
                    autoSkip: true,
                    callback: function(val, index) {
                        // Hide every 2nd tick label
                        //console.log(this.getLabelForValue(val));
                        return index % filterIndex === 0 ? this.getLabelForValue(val) : '';
                    },
                }
            }
        },
    }

  return (
    <>
        <Row className="chart-header">
            <Typography.Title level={2} className="chart-title">{coinName} Price Chart</Typography.Title>
            <Col className="price-container">
                <Typography.Title level={5} className="price-change">{coinHistory?.data?.change}%</Typography.Title>
                <Typography.Title level={5} className="current-price">Current Price: ${currentPrice}</Typography.Title>
            </Col>   
        </Row>
        <Row style={{height: '50vh'}}>
            <Col span={24} style={{height: '100%'}}>
                <Line data={data} options={options}/>
            </Col>
        </Row>
    </>
  )
}

export default LineChart