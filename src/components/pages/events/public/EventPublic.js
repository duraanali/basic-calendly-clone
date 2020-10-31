import React, { useState, useEffect } from "react";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import VideocamIcon from "@material-ui/icons/Videocam";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import EventPublicForm from "./EventPublicForm";
import { eventService } from "../../../../_services";

export default function EventPublic({match}) {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const { id } = match.params; 


  const [events, setEvents] = useState({});

  useEffect(() => {
    console.log("id", id)
    eventService.getById(id).then(event => {
      setEvents(event)
  });
  }, []);



  return (
    <div className="event-public">
      <div className="event-public-main">
        <div className="event-public-inner">
          <div className="event-public-inner-left">
            <div className="event-public-inner-left-profile">
              <img
                className="event-public-inner-left-img"
                src="https://d3v0px0pttie1i.cloudfront.net/uploads/user/avatar/6327321/920cb99f.jpg"
              />

              <h4 className="event-public-inner-left-name">Duraan Ali</h4>
              <h1 className="event-public-inner-left-title">
                {events.eventName}
              </h1>
            </div>

            <div className="event-public-inner-left-info">
              <div className="event-public-inner-left-info-time">
                <WatchLaterIcon className="event-public-inner-left-info-time-icon" />{" "}
                {events.duration}
              </div>
              <div>
                <VideocamIcon className="event-public-inner-left-info-time-icon" />{" "}
                Location: {events.location}
              </div>
            </div>

            <div className="event-public-inner-left-description">
              <p>
                {events.description}
              </p>
            </div>
          </div>
          <div className="event-public-inner-right">
            <h2 className="event-public-inner-right-title">
              Select a Date & Time
            </h2>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              injectTimes={[
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 30), 18),
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17),
              ]}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="event-public-inner-right-datapicker"
              timeIntervals={15}
            />
            
            <div className="event-public-inner-right-displayTime">

            {startDate.toISOString()}
            </div>
            <EventPublicForm events={events} startDate={startDate}/>
          </div>
        </div>
      </div>
    </div>
  );
}
