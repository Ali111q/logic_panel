import '/node_modules/bootstrap/dist/css/bootstrap.css'
import '/node_modules/bootstrap/js/dist/dropdown'
import '/node_modules/bootstrap/dist/js/bootstrap'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';


//---------------------------APP.JS---------------------------------//
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <App />
    </Router>
);

