import React from 'react';
import './market.css';

class marketStock {
    constructor(name, price, change){
        this.name = name;
        this.price = price;
        this.change = change;
    }
};

// NOTE: This code is only an example and will be removed

const example1 = new marketStock("NVDA", Math.random()*100, Math.random()*20); 
const example2 = new marketStock("IONQ", Math.random()*100, Math.random()*20);
const example3 = new marketStock("TWO", Math.random()*100, Math.random()*20); 
const example4 = new marketStock("ZECP", Math.random()*100, Math.random()*20);

const performingStocks = [example1, example2, example3, example4];

const bad1 = new marketStock("BDL", Math.random()*100, Math.random()*20 - 20);
const bad2 = new marketStock("GDOC", Math.random()*100, Math.random()*20 - 20);
const bad3 = new marketStock("NFE", Math.random()*100, Math.random()*20 - 20);
const bad4 = new marketStock("WGO", Math.random()*100, Math.random()*20 - 20);

const badStocks = [bad1, bad2, bad3, bad4];

export function Market(){
    return(
        <>
          <main className="container-fluid bg-secondary text-center fixed">
            <h1>Below are the current best performing stocks of the week (with weekly % increase)</h1>
            <section className="weekly-performers">
              <table className="table table-striped table-bordered">
                <thead className="thread-dark">
                  <tr className="bold table-primary">
                    <th>Stock</th>
                    <th>Price</th>
                    <th>% Change</th>
                  </tr>
                </thead>
                <tbody>
                    {performingStocks.map(stock => {
                      return(
                        <tr>
                          <td className='bold'>{stock.name}</td>
                          <td>${stock.price.toFixed(2)}</td>
                          <td className='table-success'>{stock.change.toFixed(2)}%</td>
                        </tr>
                        );
                    })}
                </tbody>
              </table>
            </section>
            <hr />
            <h1>Below are the worst performing stocks of the week (with weekly % decrease)</h1>
            <hr />
            <section className="weekly-worst">
              <table className="table table-striped table-bordered">
                <thead className="thread-dark">
                  <tr className="bold table-primary">
                    <th>Stock</th>
                    <th>Price</th>
                    <th>% Change</th>
                  </tr>
                </thead>
                <tbody>
                    {badStocks.map(stock => {
                      return(
                        <tr>
                          <td className='bold'>{stock.name}</td>
                          <td>${stock.price.toFixed(2)}</td>
                          <td className='table-danger'>{stock.change.toFixed(2)}%</td>
                        </tr>
                        );
                    })}
                </tbody>
              </table>
            </section>
          </main>
          
        </>
    );
}