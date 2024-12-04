import React from 'react';
import './footer.css'

export function Footer() {
    return(
      <footer className='bg-dark'>
        <div className="container-fluid">
          <a className="text-grey" href="https://github.com/Conbonbot/startup">Github</a>
          <div className='vr' />
          <a className='text-grey no-decoration spaced'>Connor Harvey</a>
        </div>
      </footer>
    );
}