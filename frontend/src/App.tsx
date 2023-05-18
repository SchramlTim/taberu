import React from 'react';
import { Route, Switch } from "react-router-dom";
import { DefaultLayout } from './Layout/DefaultLayout/DefaultLayout';
import Login from './Routes/Login/Login';
import Register from './Routes/Register/Register';
import Bowls from './Routes/Bowls/Bowls';
import BowlDetails from './Routes/BowlDetails/BowlDetails';
import { UserProvider } from './Context/UserContext';
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import BowlCreate from "./Routes/BowlCreate/BowlCreate";
import Menus from "./Routes/Menus/Menus";
import MenuDetails from "./Routes/MenuDetails/MenuDetails";
import MenuCreate from "./Routes/MenuCreate/MenuCreate";

function App() {
  return (    
    <div className={"text-text-primary"}>
      <UserProvider>
        <DefaultLayout>
          <Switch>
            <Route exact path="/"><Login/></Route>
            <Route exact path="/login"><Login/></Route>
            <Route exact path="/register"><Register/></Route>
            {
            //<PrivateRoute  path="/user"  component={User} exact />
            }
            <PrivateRoute  path="/menus"  component={Menus} exact />
            <PrivateRoute  path="/menus/create"  component={MenuCreate} exact />
            <PrivateRoute  path="/menus/:id"  component={MenuDetails} exact />
            <PrivateRoute  path="/bowls"  component={Bowls} exact />
            <PrivateRoute  path="/bowls/create"  component={BowlCreate} exact />
            <PrivateRoute  path="/bowls/:id"  component={BowlDetails} exact />
          </Switch>
        </DefaultLayout>
      </UserProvider>
    </div>
  );
}

export default App;
