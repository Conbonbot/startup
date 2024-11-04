import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Header } from './layouts/header';
import { Footer } from './layouts/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


class Stock {
    constructor(name, shares, price, profit){
        this.name = name;
        this.shares = shares;
        this.price = price;
        this.profit = profit;
    }
};

// NOTE: This code is only an example and will be removed

const example1 = new Stock("NVDA", Math.round(Math.random()*10), Math.random()*100, Math.random() * 200 - 100); 
const example2 = new Stock("IONQ", Math.round(Math.random()*10), Math.random()*100, Math.random() * 200 - 100); 
const example3 = new Stock("TWO", Math.round(Math.random()*10), Math.random()*100, Math.random() * 200 - 100); 
const example4 = new Stock("ZECP", Math.round(Math.random()*10), Math.random()*100, Math.random() * 200 - 100); 

const all_stocks = [example1, example2, example3, example4];

// End note

function App() {

    return (
        <BrowserRouter>
         <Header />
           <main className='container-fluid bg-secondary text-center'>
              <div className='welcome-title'>
                <h1>Welcome to the Stock Trader, <i>Username</i></h1>
                <h2>Below are the stocks you own, with current profits/loses.</h2>
              </div>

              <table className="table table-striped table-bordered">
                <thead className='thread-dark'>
                <tr className='bold table-primary'>
                    <th>Stock</th>
                    <th>Shares</th>
                    <th>Price ($)</th>
                    <th>Profit ($)</th>
                </tr>
                </thead>
                <tbody>
                    {all_stocks.map(stock => {
                      return(
                        <tr>
                          <td className='bold'>{stock.name}</td>
                          <td>{stock.shares}</td>
                          <td>{stock.price.toFixed(2)}</td>
                          {stock.profit > 0 ? (
                            <td className='table-success'>{stock.profit.toFixed(2)}</td>
                          ) : (
                            <td className='table-danger'>{stock.profit.toFixed(2)}</td>
                          )}
                        </tr>
                        );
                    })}
                </tbody>
              </table>
           </main>
         <Footer />
        </BrowserRouter>
    );

}

function NotFound(){
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>
}

export default App;