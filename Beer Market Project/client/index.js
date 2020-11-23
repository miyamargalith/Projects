import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProviderWithRouter } from './context';

ReactDOM.render(
    <Router>
        <ProductProviderWithRouter>
            <App />
        </ProductProviderWithRouter>
    </Router>
,
document.getElementById('root')
);
