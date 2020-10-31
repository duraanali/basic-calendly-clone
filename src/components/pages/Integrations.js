import React from 'react'
import { NavLink } from 'react-router-dom'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import VideoCallIcon from '@material-ui/icons/VideoCall';
export default function Integrations() {
    return (
        <div className="body-wrapper">

            <div className="event-intg-main">
                    <div className="event-intg-inner-container">
                        <div className="event-intg-inner-head">
                        Integrations
                        </div>
                        <div className="event-intg-inner-body">
                            <NavLink  className="event-intg-inner-body-item" to={"/integrations/google"}>

                                <CalendarTodayIcon className="svg_icons" />
                                <p className="event-intg-inner-body-item-title">Google Calendar</p>
                                <p className="event-intg-inner-body-item-desc"> Connect your google calendar to our app and manage your events.</p>
                                
                                </NavLink>

                                <NavLink  className="event-intg-inner-body-item" to={"/integrations/zoom"}>

                                <VideoCallIcon className="svg_icons" />
                                <p className="event-intg-inner-body-item-title">Zoom</p>
                                <p className="event-intg-inner-body-item-desc">Automatically include Zoom meeting details in your event</p>
                                
                                </NavLink>
                        </div>
                    </div>
            </div>
        </div>
    )
}
