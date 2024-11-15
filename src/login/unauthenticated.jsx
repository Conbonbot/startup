import React from 'react';
import Button from 'react-bootstrap/Button';

import { MessageDialog } from './messageDialog';
import './login.css';

export function Unauthenticated(props){
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayEror] = React.useState(null);

    async function login() {
        loginOrCreate(`/api/auth/login`);
    }

    async function register() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint){
        const response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify({email: userName, password: password}),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        });
        if(response?.status === 200){
          localStorage.setItem('userName', userName);
          props.onLogin(userName);
        }
        else {
          const body = await response.json();
          setDisplayEror(`Error: ${body.msg}`);
        }
    }


    return (
        <>
          <section className="login-form">
            <h2>Welcome to the Stock Trader</h2>
            <form>
              <div className="input-group mb-3">
                <span className="input-group-text" id="username">Username</span>
                <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="example@email.com" required />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="password">password</span>
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
              </div>
              <div className="col-12">
                <Button variant="primary" onClick={() => login()} disabled={!userName || !password}>Login</Button>
                <div className="vr vr-login"></div>
                <Button variant="primary" onClick={() => register()} disabled={!userName || !password}>Register</Button>
              </div>
            </form>

            <MessageDialog message={displayError} onHide={() => setDisplayEror(null)} />
          </section>
        </>
    );
}