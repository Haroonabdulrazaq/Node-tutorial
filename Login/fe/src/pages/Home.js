import React from 'react';
import axios from 'axios';


const Home = () => {
  const getUsers =()=>{
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3001/users'
    })
    .then((res)=>{
      console.log(res)
    })
 
  }
  return (
    <div>
      <h2>All users</h2>
      <button onClick={getUsers}>Get Users</button>
    </div>
  )
}

export default Home
