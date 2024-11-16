import React, { useEffect } from 'react';
import './market.css';


export function Market(){

  const [stocks, setStocks] = React.useState([]);
  useEffect(() => {
    fetch('/api/load_stocks', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
    .then((response) => response.json())
    .then((stocks) => {
      setStocks(stocks);
    })
  }, []);

  let amount = 10;
  let performingStocks = [];
  let underperfStocks = [];
  let count = 0;
  // stock.eps, stock.pe, stock.price, stock.symbol
  stocks.forEach(stock => {
    if(stock.changesPercentage > 10 && Math.random()*100 > 98){
      performingStocks.push(stock);
    }
    if(stock.changesPercentage < -10 && Math.random()*100 > 98){
      underperfStocks.push(stock);
    }
  });

    return(
        <>
          <main className="container-fluid bg-secondary text-center">
            <h1>Below are some of the best performing stocks from the NASDAQ </h1>
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
                <tbody>
                  {performingStocks.map(stock => {
                    return(
                      <tr>
                        <td className='bold'>{stock.symbol}</td>
                        <td>${stock.price}</td>
                        <td className='table-success'>{stock.changesPercentage.toFixed(3)}%</td>
                        <td>{stock.eps}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
            <hr />
            <h1>Below are the some of the worst performing stocks on the NASDAQ</h1>
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
                <tbody>
                {underperfStocks.map(stock => {
                    return(
                      <tr>
                        <td className='bold'>{stock.symbol}</td>
                        <td>${stock.price}</td>
                        <td className='table-danger'>{stock.changesPercentage.toFixed(3)}%</td>
                        <td>{stock.eps}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
          </main>
          
        </>
    );
}