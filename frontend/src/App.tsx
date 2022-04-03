import React from 'react';
import { Route, Switch } from "react-router-dom";
import { DefaultLayout } from './Layout/DefaultLayout/DefaultLayout';
import Login from './Routes/Login/Login';
import User from './Routes/User/User';
import Register from './Routes/Register/Register';
import Home from './Routes/Home/Home';
import Bowls from './Routes/Bowls/Bowls';
import BowlDetails from './Routes/BowlDetails/BowlDetails';
import { UserProvider } from './Context/UserContext';
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";

function App() {
  return (    
    <>
      <UserProvider>
        <DefaultLayout>
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route exact path="/login"><Login/></Route>
            <Route exact path="/register"><Register/></Route>
            <PrivateRoute  path="/user"  component={User} exact />
            <PrivateRoute  path="/bowls"  component={Bowls} exact />
            <PrivateRoute  path="/bowls/:id"  component={BowlDetails} exact />
          </Switch>
        </DefaultLayout>
      </UserProvider>
    </>
  );
}

export default App;
