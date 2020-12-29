import React, { useState, useEffect } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { eventService, accountService } from "../../../_services/index";
import { NavLink } from "react-router-dom";
import { useConfirm } from 'material-ui-confirm';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dropdown } from "react-bootstrap";
import * as clipboard from "clipboard-polyfill/text";

export default function EventCards() {

  var user = accountService.userValue;

  const confirm = useConfirm();
  const [events, setEvents] = useState([]);
  useEffect(() => {
   
    eventService.getAll().then((x) => setEvents(x));

  }, [events.length]);
  
  const accountId = events.filter((account) => {
      if (user.id === account.accountId) {
        return account
      
    }
  })

  


  function deleteEvent(id) {
    confirm({ description: 'Are you sure? Users will be unable to schedule further meetings with deleted event types. Meetings previously scheduled will not be affected.' })
    .then(() => {setEvents(
      events.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    eventService._delete(id).then(() => {
      setEvents((events) => events.filter((x) => x.id !== id));
    });
})
  }

  return (
    <div>
      <div className="event-cards">
        {accountId &&
          accountId.map((event) => (
            <div className="event-card">
              <div
                className="event-card-single"
                style={{ borderTopColor: `${event.eventColor}` }}
              >
                <div className="event-card-single-header">
                  <input
                    className="event-card-single-header-checkbox"
                    type="checkbox"
                  />
                  <div className="event-card-single-settings">
                  <Dropdown>
                        <Dropdown.Toggle className="profile-all">
                        <a href="#">
                    <SettingsIcon />
                    <ExpandMoreIcon />
                    </a>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu-event-card">
                    <NavLink className="dropdown-menu-link" to={`/events/${event.id}`}>
                    <EditIcon className="logout-icon"/>
                    Edit
                    </NavLink>
                   
                    <button onClick={() => deleteEvent(event.id)} className="dropdown-menu-link deletButton" to="/profile">
                    <DeleteIcon className="logout-icon"/>
                    Delete
                    </button>
                
                    </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  {/* <button
                    onClick={() => deleteEvent(event.id)}
                    className="btn btn-sm btn-danger"
                    style={{ width: "60px" }}
                    disabled={event.isDeleting}
                  >
                    {event.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button> */}
                </div>
                <div className="event-card-single-body">
                  <div className="event-card-single-body-maintext">
                    <p>{event.eventName}</p>
                  </div>
                  <div className="event-card-single-body-subtext">
                    <p>
                      {event.duration} - {event.eventType}
                    </p>
                  </div>
                </div>
                <div className="event-card-single-footer">
              
                  <NavLink className="event-card-single-footer-left" to={`/public/${event.id}`} target="_blank">
                    /{event.eventLink}
                  </NavLink>
                  <div className="event-card-single-footer-right">
                    <div className="event-card-single-footer-right-button">
                      <a
                        href="#"
                        className="event-card-single-footer-right-button1"
                        type="submit"
                      >
                        Copy Link
                      </a>

                      <a
                        href="#"
                        className="event-card-single-footer-right-button2"
                        type="submit"
                      >
                        <i class="event-card-single-footer-right-button2-arrow-down-button"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
         
      </div>
    </div>
  );
}
