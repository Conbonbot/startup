import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Footer } from './layouts/footer';
import { Learn } from './learn/learn';
import { Trade } from './trade/trade';
import { Login } from './login/login';
import { Market } from './market/market';
import { AuthState } from './login/authState';
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
    const [userName, setUserName] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    const logout = () => {
      localStorage.removeItem('userName');
      setUserName('');
      setAuthState(AuthState.Unauthenticated);
    }

    return (
        <BrowserRouter>
          <header>
            <nav className="navbar navbar-expand bg-dark" data-bs-theme="dark">
              <div className="container-fluid">
                <NavLink to="/" className="no-decoration">
                  <a className="navbar-brand">
                    <img className="header-image" src="/pages/favicon.ico" alt="Logo" />
                      Stock Trader
                    </a>
                </NavLink>
                <div className='vr vr-header'></div>
                <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink to="/learn" className="nav-link">Learn</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/market" className="nav-link">Market</NavLink>
                    </li>
                    {authState === AuthState.Authenticated && (
                      <li className="nav-item">
                        <NavLink to="/trade" className="nav-link">Trade</NavLink>
                      </li>
                    )}
                  </ul>
                </div>
                {authState === AuthState.Authenticated && (
                  <NavLink to="/" className="no-decoration text-grey" onClick={logout}>Logout</NavLink>
                )}
              </div>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Login
                      userName={userName}
                      authState={authState}
                      onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                      }}
                    />} exact />
            <Route path="/learn" element={<Learn />} />
            <Route path="/market" element={<Market />} />
            <Route path="/trade" element={<Trade userName={userName} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    );

}


function NotFound(){
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>
}

export default App;