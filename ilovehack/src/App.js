import './App.css';

import {Switch} from 'react-router-dom'
import AuthProvider from './lib/AuthProvider'
import AnonRoute from "./components/componentRoutes/AnonRoute";
import PrivateRoute from "./components/componentRoutes/PrivateRoute";


import Home from './pages/landing.jsx'
import Profile from './components/Profile/Profile.jsx'
import Events from './components/Events/Events.jsx'
import EventDetail from './components/EventDetails/EventDetails.jsx'
import Signup from './components/SignUp/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import Create from './components/createEvent/Create.jsx'


function App() {
  return (
    <AuthProvider>
    <Navbar />
    <div className="App">
     <Switch>
      <AnonRoute exact path='/' component={Home} /> 
      <PrivateRoute exact path='/myprofile' component={Profile}/>
      <PrivateRoute exact path='/events' component={Events}/>
      <PrivateRoute exact path='/add-event' component={Create}/>
      <PrivateRoute exact path='/event/:id' component={EventDetail}/>
      <AnonRoute exact path='/signup' component={Signup}/>
      </Switch> 
    </div>
    </AuthProvider>
  );
}

export default App;
