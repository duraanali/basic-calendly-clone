import React from 'react'
import Navbar from './Navbar'
import UserProfile from './UserProfile'
import logo from "../logo.png";
import { accountService } from '../_services/index';

export default function TopNav() {

    const user = accountService.userValue;
    return (
        <div className="top-header">
            {!user ? "" :
            <div className="header-inner">
            <img className="logo" src={logo} alt="Logo" />;
            <Navbar />
            <UserProfile />
            </div>
}
        </div>
    )
}
