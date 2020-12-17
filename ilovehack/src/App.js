import './App.css';

import {Switch, Route} from 'react-router-dom'

import AnonRoute from "./components/componentRoutes/AnonRoute";
import PrivateRoute from "./components/componentRoutes/PrivateRoute";


import Home from './components/Home/Home.jsx'
import Events from './components/Events/Events.jsx'
import EventDetail from './components/EventDetails/EventDetails.jsx'
import Error from './components/ErrorPage/Error.jsx'
import FAQ from './components/FAQ/FAQ.jsx'
import Onboarding from './components/Onboarding/Onboarding';
import Onboarding2 from './components/Onboarding2/Onboarding2';


function App() {
  return (
    <div className="App">
     <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/events' component={Events}/>
      <Route exact path='/event/:id' component={EventDetail}/>
      <Route exact path='/error' component={Error}/>
      <Route exact path='/FAQ' component={FAQ}/>
      <Route exact path='/onboarding' component={Onboarding}/>
      <Route exact path='/onboarding2' component={Onboarding2}/>
     </Switch>
    </div>
  );
}

export default App;
