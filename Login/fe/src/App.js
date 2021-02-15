import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import SignUp from './pages/Signup'
import SignIn from './pages/Signin';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css';


function App() {
  return (
    <div className="App">
     <p>Hello react</p>
     <Router>
       <Navbar />
       <Switch>
         <Route exact path="/">
           <Home/>
         </Route>
         <Route exact path="/signin">
           <SignIn/>
         </Route>
         <Route exact path="/signup">
           <SignUp/>
         </Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
