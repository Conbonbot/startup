import React, { useEffect } from 'react';
import { useState } from 'react';
import './main.css';

export function Main(props){
    const userName = props.userName;
    
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
      fetch('/api/stocks', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({userName: userName}),
      })
      .then((response) => response.json())
      .then((stocks) => {
        setStocks(stocks);
      })
    }, []);

    const welcome = (stocks.length) ? "Below are the stocks you currently hold" : "You currently do not hold any stocks. Go to 'Trade' to purchase some!";

    const stockRows = [];
    
    if(stocks.length) {
        for(const [index, stock] of stocks.entries()){
            const dif = (parseFloat(stock.price)-parseFloat(Math.random()*100)).toFixed(2);
            stockRows.push(
                <tr>
                  <td className='bold'>{stock.ticker}</td>
                  <td>{stock.amount}</td>
                  <td>{(stock.price*stock.amount).toFixed(2)}</td>
                  {dif > 0 ? (
                    <td className='table-success'>{dif}</td>
                  ) : (
                    <td className='table-danger'>{dif}</td>
                  )}
                </tr>
            );
        }
    } else {
        stockRows.push(
            <tr key='0'>
                <td colSpan='4'>Start Trading!</td>
            </tr>
        );
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
              <th>Shares</th>
              <th>Price ($)</th>
              <th>Profit ($)</th>
            </tr>
            </thead>
            <tbody id='stocks'>{stockRows}</tbody>
          </table>
        </div>
      </>
    );
  }