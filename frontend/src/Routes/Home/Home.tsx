import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export const Home = () => {
  const { user: userContext } = useContext(UserContext);
  console.log('test', userContext)
  return (
    <div className={"my-50"}>
      <h1 className={"bg-light"}>Home</h1>
      <p><Link to="/login">Login</Link></p>
      <p><Link to="/register">Register</Link></p>
      <p><Link to="/user">Users</Link></p>
      <p><Link to="/bowls">Bowls</Link></p>
      <p className={"m-5 text-red-300"}>Token: {userContext?.username}</p>
    </div>
  );
}


export default Home;