import './App.css';

import {Switch, Route} from 'react-router-dom'
import AuthProvider from './lib/AuthProvider'
import AnonRoute from "./components/componentRoutes/AnonRoute";
import PrivateRoute from "./components/componentRoutes/PrivateRoute";


import Home from './components/Home/Home.jsx'
import Events from './components/Events/Events.jsx'
import EventDetail from './components/EventDetails/EventDetails.jsx'


function App() {
  return (
    <AuthProvider>
    <div className="App">
     <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/events' component={Events}/>
      <Route exact path='/event/:id' component={EventDetail}/>
     </Switch>
    </div>
    </AuthProvider>
  );
}

export default App;
