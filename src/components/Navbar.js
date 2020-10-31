import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

    return (
        <div className="nav-bar-top">
            <ul  className="nav-bar">
                <li><NavLink to={"/home"} className="nav-bar-link" href="#">Home</NavLink></li>
                <li><NavLink to={"/integrations"} className="nav-bar-link" href="#">Integrations</NavLink></li>
                <li><NavLink to={"/help"} className="nav-bar-link" href="#">Help</NavLink></li>
               
            </ul>
        </div>
    )
}
