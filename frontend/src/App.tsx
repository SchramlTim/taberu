import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { DefaultLayout } from './Layout/DefaultLayout/DefaultLayout';
import Login from './Routes/Login/Login';
import Register from './Routes/Register/Register';

function App() {
  return (    
    <>
      <DefaultLayout>
        <Switch>
          <Route exact path="/"><p>Home</p></Route>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/register"><Register/></Route>
        </Switch>
      </DefaultLayout>
    </>
  );
}

export default App;
