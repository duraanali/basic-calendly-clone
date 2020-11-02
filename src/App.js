import React, {useState, useEffect} from 'react';
import './App.css';
import { ConfirmProvider } from 'material-ui-confirm';
import { Route, Switch, Redirect } from 'react-router-dom';

import Events from "./components/pages/events/Events";
import ScheduledEvents from "./components/pages/ScheduledEvents";
import WorkFlows from "./components/pages/WorkFlows";
import EventAddForm from './components/pages/events/EventAddForm';
import EventEditForm from './components/pages/events/EventEditForm';
import { Role } from './_helpers/index';
import { accountService} from './_services/index';
import {PrivateRoute} from "./_components/index";
import Profile from './components/profile/Index';
import Admin from './admin/Index';
import EventPublic from './components/pages/events/public/EventPublic';
import Integrations from './components/pages/Integrations';
import TopNav from './components/TopNav';
import EventTapNav from './components/EventTapNav';
import Help from './components/pages/Help';
import { AccountBalance } from '@material-ui/icons';
import Account from './components/account/Index';


function App() {

  const [user, setUser] = useState({});
  const [event, setEvent] = useState({});

  useEffect(() => {
   
      const subscription = accountService.user.subscribe(x => setUser(x));
      return subscription.unsubscribe;
  }, []);



  return (
    <ConfirmProvider>

    <TopNav />
    <EventTapNav />
    <Switch>
     
      <PrivateRoute path="/home" exact component={Events} />
      <PrivateRoute path="/home/scheduled_events" component={ScheduledEvents} />
      <PrivateRoute path="/home/workflows" component={WorkFlows} />


      <PrivateRoute path="/integrations" component={Integrations} />
      <PrivateRoute path="/help" component={Help} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
      

      <PrivateRoute path="/create" component={EventAddForm} />
      <PrivateRoute path="/events/:id" component={EventEditForm} />
      <Route path="/public/:id" component={EventPublic} />
      <Route path="/account" component={Account} />
      <Redirect from="*" to="/" />
    
    </Switch>
    </ConfirmProvider>
  );
}

export default App;
