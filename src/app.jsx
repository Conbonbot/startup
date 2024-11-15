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



function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    function logout() {
      fetch('/api/auth/logout', {
        method: 'delete',
      })
        .catch(() => {
          // Logout failed
        })
        .finally(() => {
          localStorage.removeItem('userName');
          setAuthState(AuthState.Unauthenticated);
        })
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
            <Route path="/trade" element={<Trade 
                        userName={userName}
                        authState={authState} />} />
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