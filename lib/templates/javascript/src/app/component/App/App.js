import React from 'react';

import logo from './logo.svg';

import './App.style.scss';

export const App = () => (
    <div className='App'>
        <header className='App-header'>
            <img src={ logo } className='App-logo' alt='logo' />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className='App-link'
                href='https://docs.reaktivelab.co/structure/reaktive-cli/getting-started'
                target='_blank'
                rel='noopener noreferrer'
            >
                Learn Reaktive-CLI
            </a>
        </header>
    </div>
);

export default App;
