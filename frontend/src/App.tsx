import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { DefaultLayout } from './Layout/DefaultLayout/DefaultLayout';
import Login from './Routes/Login/Login';

function App() {
  return (    
    <>
      <DefaultLayout>
        <Switch>
          <Route exact path="/"><p>Home</p></Route>
          <Route exact path="/login"><Login></Login></Route>
          <Route exact path="/register"><p>Register</p></Route>
        </Switch>
      </DefaultLayout>
    </>
  );
}

export default App;
