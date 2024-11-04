import React from 'react';
import {NavLink, Route, Routes } from 'react-router-dom';
import { Login } from '../login/login';
import { Learn } from '../learn/learn';
import { Trade } from '../trade/trade';

export function Header(props) {
    return(
      <>
        <header>
          <nav className="navbar navbar-expand bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
              <a className="navbar-brand">
                <img className="header-image" src="image/pages/favicon.ico" alt="Logo" />
                Stock Trader
              </a>
              <div className='vr vr-header'></div>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink to="/learn" className="nav-link">Learn</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/trade" className="nav-link">Trade</NavLink>
                  </li>
                </ul>
              </div>
              <NavLink to="/login" className="login text-light no-decoration">Login</NavLink>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/learn" element={<Learn />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    );
}