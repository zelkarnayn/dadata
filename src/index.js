import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LifeSearch from './LifeSearch';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <LifeSearch/>
  </React.StrictMode>
);

