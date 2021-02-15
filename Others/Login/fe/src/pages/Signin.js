import React,{useState} from 'react';
import axios from 'axios';


const Signin = () => {
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
      url: 'http://localhost:3001/signin'
    })
    .then((res)=>{
      console.log(res)
    })
    setName("")
    setPassword("")
  }
 
  return (
    <div>
      <h2>Sign In</h2>
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
        <button onClick={(e)=>handleClick(e)}>Sign In</button>
      </form>
    </div>
  )
}

export default Signin;
