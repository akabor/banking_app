import NavBar from './Components/navbar';
import CreateAccount from './Components/createaccount';
import AllData from './Components/alldata';
import Home from './Components/home';
import Login from './Components/login';
import Deposit from './Components/deposit';
import Withdraw from './Components/withdraw';
import React, {useState} from 'react';
import { HashRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="container" style={{padding: "5px"}}>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/login/" element={<Login />} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route path="/createaccount/" element={<CreateAccount />} />
          <Route path="/accountinformation/" element={<AllData />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
