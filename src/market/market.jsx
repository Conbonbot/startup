import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './market.css';


export function Market(){

  // Websocket connection
  let port = window.location.port;
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const [socket, setSocket] = React.useState([]);
  const [stocks, setStocks] = React.useState([]);
  useEffect(() => {
    setSocket(new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`));
    fetch('/api/send_stocks', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
    .then((response) => response.json())
    .then((stocks) => {
      setStocks(stocks);
    })
    setPerformingStocks();
    setUnderPerfStocks();
  }, []);

  
  // Update stock information when it recieves a message
  if(socket){
    useEffect(() => {
      socket.onmessage = async (msg) => {
        const data = JSON.parse(await msg.data);
        setStocks(data);
        setPerformingStocks();
        setUnderPerfStocks();
      }}, [stocks]);
  }

  // This forces an API call through the WebSocket and updates all data
  function forceUpdate(){
    fetch('/api/force_update', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
  }
  
  
  function setPerformingStocks(){
    let performingStocks = [];
    // stock.eps, stock.pe, stock.price, stock.symbol
    stocks.forEach((stock, i) => {
      if(stock.changesPercentage > 10 && Math.random()*100 > 98){
        performingStocks.push(
          <tr key={i}>
            <td className='bold'>{stock.symbol}</td>
            <td>${stock.price}</td>
            <td className='table-success'>{stock.changesPercentage.toFixed(2)}%</td>
            <td>{(stock.eps) ? stock.eps : `N/A`}</td>
          </tr>
        );
      }
    });
    return performingStocks;
  }

  function setUnderPerfStocks(){
    let underperfStocks = [];
    stocks.forEach((stock, i) => {
      if(stock.changesPercentage < -10 && Math.random()*100 > 98){
        underperfStocks.push(
          <tr key={i}>
            <td className='bold'>{stock.symbol}</td>
            <td>${stock.price}</td>
            <td className='table-danger'>{stock.changesPercentage.toFixed(2)}%</td>
            <td>{(stock.eps) ? stock.eps : `N/A`}</td>
          </tr>
        );
      }
    });
    
    return underperfStocks;
  }

    return(
        <>
          <main className="container-fluid bg-secondary text-center">
            <h1>Below are some of the best and worst performing stocks on the NASDAQ from the week</h1>
            <h4>Note: The stocks are randomized and updated every hour.</h4>
            <h4>They can also be forced to update by using the button at the bottom of the screen</h4>
            <section className="weekly-performers">
              <table className="table table-striped table-bordered">
                <thead className="thread-dark">
                  <tr className="bold table-primary">
                    <th>Stock</th>
                    <th>Price</th>
                    <th>% Change</th>
                    <th>EPS</th>
                  </tr>
                </thead>
                <tbody id='perf-stocks'>{setPerformingStocks()}</tbody>
              </table>
            </section>
            <hr />
            <section className="weekly-worst">
              <table className="table table-striped table-bordered">
                <thead className="thread-dark">
                  <tr className="bold table-primary">
                    <th>Stock</th>
                    <th>Price</th>
                    <th>% Change</th>
                    <th>EPS</th>
                  </tr>
                </thead>
                <tbody id='underperf-stocks'>{setUnderPerfStocks()}</tbody>
              </table>
            </section>
            <div className="col-12">
              <h6>Wait around 20-30 seconds after pressing the button for the changes to take place.</h6>
              <Button className='btn btn-primary' onClick={() => forceUpdate()} disabled={!socket} >Force Update</Button>
            </div>
          </main>
          
        </>
    );
}