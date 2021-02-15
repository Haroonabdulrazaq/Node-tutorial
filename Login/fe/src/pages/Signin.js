import React,{useState} from 'react'

const Signin = () => {
  let [name, setName] = useState('')
  let [password, setPassword] = useState('');

  const handleClick =(e)=>{
    e.preventDefault();
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
        <button onClick={(e)=>handleClick(e)}>Sign Up</button>
      </form>
    </div>
  )
}

export default Signin;
