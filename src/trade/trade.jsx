import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { TradeDialog } from './tradeDialog';
import './trade.css';


export function Trade(props){

    if (props.userName){
      return (
          <>
            <main className="container-fluid bg-secondary text-center">
              <CurrentStocks props={props}/>
              <section className="buy-sell-stocks">
                <h2>Enter Below</h2>
                <Stocks props={props} />
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

function CurrentStocks(props) {
  const userName = props.props.userName;
  const [stocks, setStocks] = React.useState([]);

  React.useEffect(() => {
    const stocksText = localStorage.getItem(userName);
    if(stocksText) {
        setStocks(JSON.parse(stocksText));
    }
  }, []);
  
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





function Stocks(props) {
    const [ticker, setTicker] = useState(null);
    const [amount, setAmount] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);


    const userName = props.props.userName;
    const userStocks = localStorage.getItem(userName);

    let stocks = [];
    if(userStocks) {
      stocks = JSON.parse(userStocks);
    }

    function clearForm(){
      setTicker(null);
      setAmount(null);
      setMessage('');
      setError(null);
      document.getElementById("stock-trading-form").reset();
    }

    async function buy(userName, ticker, amount){
      if(amount < 1){
        setMessage(`Number has to be greater than 0`);
        setError(true);
        return;
      }
       // TODO: update to put actual information about stock price
      const date = new Date().toLocaleDateString();
      let existStock = false;
      stocks.forEach((stock, index) => {
        if(stock.ticker === ticker){
          stocks[index].amount = parseInt(stock.amount) + parseInt(amount);
          stocks[index].price = Math.random()*100;
          stocks[index].date = date;
          existStock = true;
        }
      });
      if(!existStock){
        const order = {ticker: ticker, amount: amount, price: Math.random()*100, date: date};
        stocks.push(order);
      }
      await fetch('/api/buy', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(stocks),
      });
      localStorage.setItem(userName, JSON.stringify(stocks));
      if(amount > 1){
        setMessage(`${amount} shares of ${ticker} bought successfully!`);
      } else {
        setMessage(`${amount} share of ${ticker} bought successfully!`);
      }
      setError(false);
    }

    async function sell(userName, ticker, amount){
      // Check if user holds that stock (and amount)
      if(amount < 1){
        setMessage(`Number has to be greater than 0`);
        setError(true);
        return;
      }
      const date = new Date().toLocaleDateString();
      let existStock = false;
      stocks.forEach((stock, index) => {
        if(stock.ticker === ticker){
          if(stock.amount < amount){
            setMessage(`You cannot sell more shares of ${ticker} than you owe. You can sell up to ${stock.amount} shares of this stock.`);
            setError(true);
            return;
          }
          else if(stock.amount == amount){
            stocks.splice(index,1);
            existStock = true;
          }
          else {
            stocks[index].amount = parseInt(stock.amount) - parseInt(amount);
            stocks[index].date = date;
            existStock = true;
          }
        }
        if(!existStock){
          setMessage(`You do not own any stock with the name: ${ticker}.`);
          setError(true);
        } else {
          setError(false);
        }
      })
      if(!error){
        await fetch('/api/sell', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(stocks),
        });
        localStorage.setItem(userName, JSON.stringify(stocks));
        if(amount > 1){
          setMessage(`${amount} shares of ${ticker} sold successfully!`);
        } else {
          setMessage(`${amount} share of ${ticker} sold successfully!`);
        }
      }
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
            <Button className="btn btn-success" onClick={() => buy(userName, ticker, amount)} disabled={!ticker || !amount} >Buy</Button>
            <div className="vr vr-login"></div>
            <Button className="btn btn-danger" onClick={() => sell(userName, ticker, amount)} disabled={!userStocks || !ticker || !amount} >Sell</Button>
          </div>
          <br />
        </form>
        <TradeDialog message={message} error={error} clearForm={() => clearForm()} />
      </>
    );
}
