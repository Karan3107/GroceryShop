import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './components/basic.css';
import './index.css';
import App from './app.js';

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>,document.getElementById('root'));
