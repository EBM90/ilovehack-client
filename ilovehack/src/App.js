import './App.css';

import {Switch, Route} from 'react-router-dom'
import AuthProvider from './lib/AuthProvider'
import AnonRoute from "./components/componentRoutes/AnonRoute";
import PrivateRoute from "./components/componentRoutes/PrivateRoute";


import Home from './components/Home/Home.jsx'
import Profile from './components/Profile/Profile.jsx'
import Events from './components/Events/Events.jsx'
import EventDetail from './components/EventDetails/EventDetails.jsx'
import Signup from './components/SignUp/Signup.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Create from './components/createEvent/Create.jsx'
import Login from './components/LogIn/Log-in.jsx'
import Error from './components/ErrorPage/Error.jsx'
import FAQ from './components/FAQ/FAQ.jsx'
import Onboarding from './components/Onboarding/Onboarding';
import Onboarding2 from './components/Onboarding2/Onboarding2';
import Test from "./components/Test/Test.jsx";
import landing from './pages/landing.jsx';
import Sockets from './components/sockets/Sockets.jsx';
import socket from './components/sockets/Sockets.jsx';


function App() {
  socket.emit('coectado', "que pasa cra pasa")
  return (
    <AuthProvider>
    <Navbar />
    <div className="App">
     <Switch>
      <AnonRoute exact path='/' component={landing} /> 
      <PrivateRoute exact path='/test' component={Test}/>
      <PrivateRoute exact path='/home' component={Home} />
      <PrivateRoute exact path='/myprofile' component={Profile}/>
      <PrivateRoute exact path='/all-events' component={Events}/>
      <PrivateRoute exact path='/add-event' component={Create}/>
      <PrivateRoute exact path='/event/:id' component={EventDetail}/>
      <AnonRoute exact path='/signup' component={Signup}/>
      <AnonRoute exact path='/test' component={Test}/>
      <AnonRoute exact path='/login' component={Login}/>
      <AnonRoute exact path='/error' component={Error}/>
      <Route exact path='/FAQ' component={FAQ}/>
      <AnonRoute exact path='/onboarding' component={Onboarding}/>
      <AnonRoute exact path='/onboarding2' component={Onboarding2}/>
      </Switch> 
    </div>
    </AuthProvider>
  );
}

export default App;
