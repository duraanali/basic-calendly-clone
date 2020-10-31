import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from "../../logo-black.png";
import { accountService } from '../../_services/index';

import EventPublic from './EventPublic';

function Public({ history, match }) {
    const { path } = match;


    return (
        <div className="event-login-body">
                 <img src={logo} alt="Logo" width={35} height={35}/>
                    <h3>Sign up with Calendly for free</h3>
            <div className="event-login-body-box">
                        <Switch>
                            <Route path={`${path}/schedule`} component={EventPublic} />
                        </Switch>
      </div>
        </div>
    );
}

export default Public;