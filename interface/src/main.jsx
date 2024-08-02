import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; 
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Habilita o modo rigoroso de React */}
    <App /> {/* Renderiza o componente App */}
  </React.StrictMode>,
);
