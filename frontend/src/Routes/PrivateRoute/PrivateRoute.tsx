import React, {useContext} from "react";
import { Route, Redirect } from  "react-router-dom";
import {UserContext} from "../../Context/UserContext";

const  PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = (props) => {
    const { user: userContext } = useContext(UserContext)
    console.log(userContext)
    return userContext ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) :
        (<Redirect  to="/login"  />);
};
export default  PrivateRoute;