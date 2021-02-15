import React,{useState} from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';


const Home = () => {
  const [user, setUser] = useState(null)
  const getUsers = ()=>{
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3001/users'
    })
    .then((response)=> {
      const user = response.data
      setUser(user)
    })
  } 

  const handleSignout =()=>{
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3001/signout'
    })
  }
  return (
    <div>
     { user ?  <a href="signout" onClick={handleSignout}>Signout</a> :  null }
      <h2>All user</h2>
      <button onClick={getUsers}>Get Users</button>
       { user ? <h1> Welcome back {user.username} </h1> :  <p>No one is logIn</p> }
    </div>
  )
}

export default Home
