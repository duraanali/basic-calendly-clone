import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from "../../logo-black.png";
import { accountService } from '../../_services/index';

import { Login } from './Login';
import { Register } from './Register';
import { VerifyEmail } from './VerifyEmail';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';

function Account({ history, match }) {
    const { path } = match;

    useEffect(() => {
        // redirect to home if already logged in
        if (accountService.userValue) {
            history.push('/');
        }
    }, []);

    return (
        <div className="event-login-body">
                 <img src={logo} alt="Logo" width={35} height={35}/>
                    <h3>Sign up with Calendly for free</h3>
            <div className="event-login-body-box">
                        <Switch>
                            <Route path={`${path}/login`} component={Login} />
                            <Route path={`${path}/register`} component={Register} />
                            <Route path={`${path}/verify-email`} component={VerifyEmail} />
                            <Route path={`${path}/forgot-password`} component={ForgotPassword} />
                            <Route path={`${path}/reset-password`} component={ResetPassword} />
                        </Switch>
      </div>
        </div>
    );
}

export default Account;