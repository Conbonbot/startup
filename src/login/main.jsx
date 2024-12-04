import React, { useEffect } from 'react';
import { useState } from 'react';
import './main.css';

export function Main(props){
    const userName = props.userName;
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const [socket, setSocket] = React.useState([]);
    const [stocks, setStocks] = useState([]);
    const [realStocks, setRealStocks] = useState([]);

    // Initalization for user's stock information + webSocket
    useEffect(() => {
      setSocket(new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`));
      fetch('/api/stocks', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({email: userName}),
      })
      .then((response) => response.json())
      .then((stocks) => {
        setStocks(stocks);
      })
      
    }, []);


    // Inital stock information
    useEffect(() => {
      fetch('/api/send_stocks', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      })
      .then((response) => response.json())
      .then((realStocks) => {
        setRealStocks(realStocks);
      })
    }, []);

    // Websocket -> updates current stock information
    if(socket){
      useEffect(() => {
        socket.onmessage = async (msg) => {
          const data = JSON.parse(await msg.data);
          setRealStocks(data);
          createStockRows();
        }}, [realStocks]);
    }

    const welcome = (stocks.length) ? "Below are the stocks you currently hold" : "You currently do not hold any stocks. Go to 'Trade' to purchase some!";

    function createStockRows(){
      const stockRows = [];
      if(stocks.length) {
          let totalShares = 0;
          let totalPrice = 0;
          let totalProfit = 0;
          for(const [index, stock] of stocks.entries()){
              for(const [index, realStock] of realStocks.entries()){
                if(realStock.symbol === stock.ticker){
                  let dif = (parseFloat(stock.price)-parseFloat(realStock.price)).toFixed(2);
                  totalProfit += parseFloat(dif);
                  totalPrice += realStock.price*stock.amount;
                  totalShares += parseInt(stock.amount);
                  stockRows.push(
                      <tr key={index}>
                        <td className='bold'>{stock.ticker}</td>
                        <td>{realStock.name}</td>
                        <td>{stock.amount}</td>
                        <td>{(realStock.price*stock.amount).toFixed(2)}</td>
                        {dif > 0 ? (
                          <td className='table-success'>{dif}</td>
                        ) : (
                          <td className='table-danger'>{dif}</td>
                        )}
                        <td>{realStock.changesPercentage.toFixed(3)}%</td>
                      </tr>
                  );
                  break;
                }
              }
              
          }
          stockRows.push(
            <tr key={stocks.length+1} className='table-primary'>
              <td className='bold' colSpan='2'>Summary</td>
              <td>{totalShares}</td>
              <td>{totalPrice}</td>
              {totalProfit > 0 ? (
                <td className='table-success'>{totalProfit}</td>
              ) : (
                <td className='table-danger'>{totalProfit}</td>
              )}
              <td>{(parseFloat(totalProfit)/parseFloat(totalPrice)).toFixed(3)}%</td>
            </tr>
          )
      } else {
          stockRows.push(
              <tr key='0'>
                  <td colSpan='5'>Start Trading!</td>
              </tr>
          );
      }
    return stockRows;
    }


    return (
      <>
        <div className='welcome-title'>
          <h1>Welcome to the Stock Trader, <i>{props.userName}</i>!</h1>
          <h2>{welcome}</h2>
          <table className='table table-striped table-bordered short-table'>
            <thead className='thread-dark'>
            <tr className='bold table-primary'>
              <th>Stock</th>
              <th>Name</th>
              <th>Shares</th>
              <th>Price ($)</th>
              <th>Profit ($)</th>
              <th>Daily Change (%)</th>
            </tr>
            </thead>
            <tbody id='stocks'>{createStockRows()}</tbody>
          </table>
        </div>
      </>
    );
  }