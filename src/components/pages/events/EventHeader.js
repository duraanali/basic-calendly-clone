import React from "react";
import profile from "../../../profile.jpg";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";

import { accountService } from '../../../_services/index';

export default function EventHeader() {

  const user = accountService.userValue;

 console.log("user", user.id)
  return (
    <div>
      <table className="event-header-table">
        <tbody>
          <tr>
            <td className="event-header-table-avatar">
              <div className="event-header-table-avatar-image">
                <Avatar alt="Duraan Ali" src={profile} />
              </div>
            </td>
            <td className="event-header-table-name">
              <div>
                <div>{user.firstName} {user.lastName}</div>
                <div>
                  <a className="event-header-table-name-link"
                    href="https://kulanify.com/duraanali"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    kulanify.com/duraanali
                  </a>
                </div>
              </div>
            </td>
            <td className="event-header-add-event">
              <div className="event-header-add-event2">
                <div>
                  <div className="event-header-add-event-link event-header-add-event3">
                    <div>
                      <a href="#" className="event-header-add-event-link2">
                        <Link to="/create" className="event-header-add-event-link4">
                        <AddIcon /><span className="event-header-add-event-title">New Event Type</span>
                        </Link>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  );
}
