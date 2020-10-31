import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { accountService, eventService } from '../_services/index';

export default function EventTapNav({match}) {

    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
      
        return subscription.unsubscribe;
    }, []);

  console.log(eventService.eventValue)
// only show nav when logged in
if (!user) return null;

  return (
    <div className="wrapper">
      <div className="home-bar-wrapper">
        <div className="home-bar-title">
          <div>My Kulan</div>
          <i className="arrow down"></i>
        </div>
        <nav className="home-bar-nav">
          <ul className="home-bar-nav-list">
            <li>
              <NavLink
                to="/home"
                activeStyle={{
                  borderBottom: "3px solid #dfa2a2d9",
                  paddingBottom: "23px",
                }}
              >
                Event Types
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/scheduled_events"
                activeStyle={{
                  borderBottom: "3px solid #dfa2a2d9",
                  paddingBottom: "23px",
                }}
              >
                Scheduled Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/workflows"
                activeStyle={{
                  borderBottom: "3px solid #dfa2a2d9",
                  paddingBottom: "23px",
                }}
              >
                Workflows
              </NavLink>
            </li>
            
          </ul>
        </nav>
      </div>
    </div>
  );
}
