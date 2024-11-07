import React from 'react';
import Button from 'react-bootstrap/Button';
import { Unauthenticated } from './unauthenticated';
import { Main } from './main';
import './login.css';
import { AuthState } from './authState';

export function Login({userName, authState, onAuthChange}){

    return (
        <>
          <main className="container-fluid bg-secondary text-center">
            <div>
              {authState === AuthState.Authenticated && (
                <Main userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
              )}
              {authState === AuthState.Unauthenticated && (
                <Unauthenticated userName={userName} onLogin={(loginUserName) => onAuthChange(loginUserName, AuthState.Authenticated)} />
              )}
            </div>
        </main>
        </>
    );
}