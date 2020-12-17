import './App.css';

import {Switch, Route} from 'react-router-dom'
import AuthProvider from './lib/AuthProvider'
import AnonRoute from "./components/componentRoutes/AnonRoute";
import PrivateRoute from "./components/componentRoutes/PrivateRoute";
import AuthProvider from "../src/lib/AuthProvider";


import Home from './components/Home/Home.jsx'
import Events from './components/Events/Events.jsx'
import EventDetail from './components/EventDetails/EventDetails.jsx'
import Signup from './components/SignUp/Signup.jsx'
import Navbar from './components/Navbar.jsx'


function App() {
  return (
    <AuthProvider>
    <Navbar />
    <div className="App">
     <Switch> 
      <AnonRoute exact path='/' component={Home}/>
      <AnonRoute exact path='/events' component={Events}/>
      <AnonRoute exact path='/event/:id' component={EventDetail}/>
      <AnonRoute exact path='/signup' component={Signup}/>
      </Switch> 
    </div>
    </AuthProvider>
  );
}

export default App;
