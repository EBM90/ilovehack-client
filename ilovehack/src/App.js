import './App.css';

import {Switch, Route} from 'react-router-dom'
import AuthProvider from './lib/AuthProvider'
import AnonRoute from "./components/componentRoutes/AnonRoute";
import PrivateRoute from "./components/componentRoutes/PrivateRoute";

import Navibar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Events from './pages/Events/Events.jsx'
import EventDetail from './pages/EventDetails/EventDetails.jsx'
import Userdetails from './pages/User-details/User-details.jsx'
import Signup from './pages/SignUp/Signup.jsx'
import Create from './pages/CreateEvent/create.jsx'
import Login from './pages/LogIn/Log-in.jsx'
import Error from './pages/ErrorPage/Error.jsx'
import FAQ from './pages/FAQ/FAQ.jsx'
import Onboarding from './components/Onboarding/Onboarding';
import Onboarding2 from './components/Onboarding2/Onboarding2';
import Test from "./components/Test/Test.jsx";
import landing from './pages/Landing/landing.jsx';
import Other from './pages/Profile/OtherProfile.jsx'
// import Sockets from './components/sockets/Sockets.jsx';
import socket from './components/sockets/Sockets.jsx';


function App() {
  socket.emit('coectado', "que pasa cra pasa")
  return (
    <AuthProvider>
    <Navibar />
    <div className="App">
     <Switch>
      <AnonRoute exact path='/' component={landing} /> 
      {/* <PrivateRoute exact path='/test' component={TestOfTest}/> */}
      <PrivateRoute exact path='/home' component={Home} />
      <PrivateRoute exact path='/myprofile' component={Profile}/>
      <PrivateRoute exact path='/all-events' component={Events}/>
      <PrivateRoute exact path='/add-event' component={Create}/>
      <PrivateRoute exact path='/event/:id' component={EventDetail}/>
      <PrivateRoute exact path='/profile/:id' component={Userdetails}/>
      <AnonRoute exact path='/signup' component={Signup}/>
      <PrivateRoute exact path='/test' component={Test}/>
      <AnonRoute exact path='/login' component={Login}/>
      <AnonRoute exact path='/error' component={Error}/>
      <Route exact path='/FAQ' component={FAQ}/>
      <AnonRoute exact path='/onboarding' component={Onboarding}/>
      <AnonRoute exact path='/onboarding2' component={Onboarding2}/>
      <PrivateRoute exact path='/other' component={Other}/>
      </Switch> 
    </div>
    </AuthProvider>
  );
}

export default App;
