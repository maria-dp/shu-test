import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Event from "./pages/Event"
//import Home from ".pages/Home"
import Login from "./pages/Login"
import NewEvent from "./pages/NewEvent"
import SignUp from "./pages/SignUp"
//import AllEvents from './pages/AllEvents';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="Login" element={<Login />} />
        <Route path="addEvent" element={<NewEvent />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="events" element={<Event />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
