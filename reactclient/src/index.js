import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Sequence from './components/Sequence';
import History from './components/History';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-sequence" element={<Sequence />} />
        <Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

