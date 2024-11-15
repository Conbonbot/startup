import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { TradeDialog } from './tradeDialog';
import './trade.css';


export function Trade(props){

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

    if (props.userName){
      return (
          <>
            <main className="container-fluid bg-secondary text-center">
              <CurrentStocks stocks={stocks}/>
              <section className="buy-sell-stocks">
                <h2>Enter Below</h2>
                <Stocks userName={userName} stocks={stocks} />
              </section>
            </main>
          </>
      );
    } else {
      const navigate = useNavigate();
      return (
        <>
        <main className="container-fluid bg-secondary text-center">
          <Alert variant='danger' className='narrow'>
          <Alert.Heading>Something's not right</Alert.Heading>
          <p>It appears you're not signed in. Click on the button below to sign in.</p>
          <hr />
          <div className='d-flex justify-content-end'>
          <Button onClick={() => navigate('/')} variant='outline-danger'>Sign in</Button>
          </div>
          </Alert>
        </main>
        </>
      )
    }
    
}

function CurrentStocks(stocks) {
  const stockRows = [];
  if(stocks.stocks.length) {
    stocks.stocks.forEach(stock => {
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
    });
    return (
      <>
        <section className="current-stocks">
            <h2 className="change-size">On the right are the stocks you currently own, with profit/loss. Use the form below to buy/sell stocks</h2>
            <table className='table table-striped table-bordered'>
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
          </section>
      </>
    );
  } else {
      return (
        <>
          <h2>You currently do not hold any stocks, use the form below to buy!</h2>
        </>
      );
  }

  
}





function Stocks(user) {
    const [ticker, setTicker] = useState('');
    const [amount, setAmount] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);



    async function buy(ticker, amount){
      const response = await fetch('/api/buy', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({userName: user.userName, ticker: ticker, amount: amount}),
      });
      const body = await response.json();
      setMessage(body.message);
      setError(body.error);
    }

    async function sell(ticker, amount){
      const response = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({userName: user.userName, ticker: ticker, amount: amount}),
      });
      const body = await response.json();
      setMessage(body.message);
      setError(body.error);
    }



    

    return (
      <>
        <form id="stock-trading-form">
          <div className="input-group mb-3">
            <span className="input-group-text" id="ticker">Ticker</span>
            <input className="form-control" type="text" value={ticker} onChange={(e) => setTicker((e.target.value).toUpperCase())} placeholder="e.g. NVDA" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="number">#</span>
            <input className="form-control" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 2" />
          </div>
          <div className="col-12">
            <Button className="btn btn-success" onClick={() => buy(ticker, amount)} disabled={!ticker || !amount} >Buy</Button>
            <div className="vr vr-login"></div>
            <Button className="btn btn-danger" onClick={() => sell(ticker, amount)} disabled={!user.stocks.length || !ticker || !amount} >Sell</Button>
          </div>
          <br />
        </form>
        <TradeDialog message={message} error={error} />
      </>
    );
}
