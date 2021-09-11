import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { DefaultLayout } from './Layout/DefaultLayout/DefaultLayout';
import Login from './Routes/Login/Login';
import User from './Routes/User/User';
import Register from './Routes/Register/Register';
import Home from './Routes/Home/Home';
import Bowls from './Routes/Bowls/Bowls';
import BowlDetails from './Routes/BowlDetails/BowlDetails';

function App() {
  return (    
    <>
      <DefaultLayout>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/register"><Register/></Route>
          <Route exact path="/user"><User/></Route>
          <Route exact path="/bowls"><Bowls/></Route>
          <Route exact path="/bowls/:id"><BowlDetails/></Route>
        </Switch>
      </DefaultLayout>
    </>
  );
}

export default App;
