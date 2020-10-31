import React from "react";
import Avatar from "@material-ui/core/Avatar";
import profile from "../profile.jpg";
import { accountService } from "../_services/index";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Role } from "../_helpers/index";
import { Divider } from "@material-ui/core";

export default function UserProfile() {
  const user = accountService.userValue;
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className="profile-all">
          <a href="#">
            <div className="profile-button">
              <Avatar alt={user.firstName} src={profile} />
              <div className="profile-account">Account</div>
            </div>
          </a>
        </Dropdown.Toggle>

        <div>
          <Dropdown.Menu className="dropdown-menu">
            <NavLink className="dropdown-menu-link" to="/profile">
            <PersonIcon className="logout-icon"/>
              Profile
            </NavLink>
            <Divider component="li" />
            {user.role === Role.Admin && (
              <NavLink className="dropdown-menu-link" to="/admin">
                  <LockOpenIcon className="logout-icon"/>
                Admin
              </NavLink>
            )}
            <Divider component="li" />
            <div className="logout">
            
            <a
              href="#"
              className="dropdown-menu-link"
              onClick={accountService.logout}
            ><ExitToAppIcon className="logout-icon"/>
              Logout
            </a>
            </div>
          </Dropdown.Menu>
        </div>
      </Dropdown>
    </div>
  );
}
