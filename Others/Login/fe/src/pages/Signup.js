import React,{ useState } from 'react';
import axios from 'axios';

const Signup = () => {
  let [name, setName] = useState('')
  let [password, setPassword] = useState('');

  const handleClick =(e)=>{
    e.preventDefault();
   
    axios({
      method: 'POST',
      data: {
        username: name,
        password
      },
      withCredentials: true,
      url: 'http://localhost:3001/signup'
    })
    .then((res)=>{
      console.log(res)
    })
    setName("")
    setPassword("")
  }
 
  return (
    <div>
      <h2>Sign up</h2>
      <form >
        <input
        type="text"
        placeholder="Username"
        name="name"
        value={name}
        onChange={(e)=> 
          setName(e.target.value)}
        />
        <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />
        <button onClick={(e)=>handleClick(e)}>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup;
