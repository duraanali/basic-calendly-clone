import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { eventService, alertService } from "../../../_services/index";
import {Switch } from "@material-ui/core";


function EventAddForm({ history, match }) {
  const { id } = match.params;


  const [events, setEvents] = useState({});

  useEffect(() => {
    console.log("id", id)
    eventService.getById(id).then(event => {
      setEvents(event)
  });
  }, []);



  const initialValues={
    eventName: events.eventName,
    location: events.location,
    description: events.description,
    eventLink: events.eventLink,
    eventColor: events.eventColor,
    eventType: events.eventType,
    duration: events.duration,
    availability: events.availability,
    isSecret: events.isSecret,
  }


  function onSubmit(values, { setStatus, setSubmitting }) {
    setStatus();
  
        updateUser(id, values, setSubmitting)
          console.log("UPDATED PROMISE")
          history.push('/');

      
}



function updateUser(id, values, setSubmitting) {
  console.log("UPDATED")
    eventService.update(id, values)
        .then(() => {
            
            history.push('/');
        })
        .catch(error => {
            setSubmitting(false);
            alertService.error(error);
        });
}



  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          
          /* and other goodies */
        }) => (
          <div className="event-form">
            <div className="event-form-title">
              <h2>What event is this</h2>
            </div>
  
            <form className="event-form-body" onSubmit={handleSubmit}>
              <div className="event-form-body-fields">
                <label>Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.eventName}
                />
               
              </div>
              <div className="event-form-body-fields">
                <label>Event Location</label>

                <select
                  name="location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                >
                  <option>Add a Location</option>
                  <option value="In-Person Meeting">In-Person Meeting</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Ask Invitee">Ask Invitee</option>
                </select>
              </div>
              <div className="event-form-body-fields">
                <label>Event Type</label>
                <input
                  type="text"
                  name="eventType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.eventType}
                  placeholder="i.e 30 Min"
                />
               

                {/* <Button variant="outlined" color="secondary" name="eventType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value="15 Min" >
        15 Min
      </Button> */}
              </div>

              <div className="event-form-body-fields">
                <label>Event Duration</label>
                <input
                  type="text"
                  name="duration"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.duration}
                />
              </div>
              <div className="event-form-body-fields">
                <label>Your Availability</label>
                <input
                  type="text"
                  name="availability"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.availability}
                />
              </div>
              <div className="event-form-body-fields">
                <label>Event Description</label>

                <textarea
                  className="event-form-textarea"
                  name="description"
                  placeholder="Write a summary and any detail your invitee should know about the event"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                >
                  {" "}
                </textarea>
              </div>
              <div className="event-form-body-fields">
                <label>Event Link</label>
                <div className="event-form-body-url">
                  calendly.com/duraanali/
                </div>
                <div className="event-form-body-url-input">
                  <input
                    type="text"
                    name="eventLink"
                    placeholder="Event Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.eventLink}
                  />
                </div>
              </div>
              <div className="event-form-body-fields">
                <label>Hide this event from your main public profile page?</label>
                <Switch
                  checked={values.isSecret}
                  onChange={handleChange}
                  color="primary"
                  name="isSecret"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>

              <div className="event-form-body-fields">
                <label>Event Color</label>
                <div className="color" style={{backgroundColor: "#ee5353"}}>
                  <input type="radio" checked={values.eventColor === "#ee5353"}
                  onChange={handleChange}
                  value="#ee5353"
                  name="eventColor" />
                  <i className="checkbox-icon"></i>
                </div>
               
                <div className="color" style={{backgroundColor: "#f778b4"}}>
                <input type="radio" checked={values.eventColor === "#f778b4"}
                  onChange={handleChange}
                  value="#f778b4"
                  name="eventColor" />
                <i className="checkbox-icon"></i>
              </div>

              <div className="color" style={{backgroundColor: "#e27eff"}}>
                <input type="radio" checked={values.eventColor === "#e27eff"}
                  onChange={handleChange}
                  value="#e27eff"
                  name="eventColor" />
                <i className="checkbox-icon"></i>
              </div>

              <div className="color" style={{backgroundColor: "#8989fc"}}>
                <input type="radio" checked={values.eventColor === "#8989fc"}
                  onChange={handleChange}
                  value="#8989fc"
                  name="eventColor" />
                <i className="checkbox-icon"></i>
              </div>

              <div className="color" style={{backgroundColor: "#4a91e9"}}>
                <input type="radio" checked={values.eventColor === "#4a91e9"}
                  onChange={handleChange}
                  value="#4a91e9"
                  name="eventColor" />
                <i className="checkbox-icon"></i>
              </div>

              <div className="color" style={{backgroundColor: "#0cc0d7"}}>
                <input type="radio" checked={values.eventColor === "#0cc0d7"}
                  onChange={handleChange}
                  value="#0cc0d7"
                  name="eventColor" />
                <i className="checkbox-icon"></i>
              </div>

              <div className="color" style={{backgroundColor: "#34c76e"}}>
                <input type="radio" checked={values.eventColor === "#34c76e"}
                  onChange={handleChange}
                  value="#34c76e"
                  name="eventColor" />
                <i className="checkbox-icon"></i>
              </div>

              <div className="color" style={{backgroundColor: "#67c820"}}>
                <input type="radio" checked={values.eventColor === "#67c820"}
                  onChange={handleChange}
                  value="#67c820"
                  name="eventColor" />
                <i className="checkbox-icon"></i>
              </div>

              <div className="color" style={{backgroundColor: "#dfc12d"}}>
                <input type="radio" checked={values.eventColor === "#dfc12d"}
                  onChange={handleChange}
                  value="#dfc12d"
                  name="eventColor" />
                <i className="checkbox-icon"></i>
              </div>

              <div className="color" style={{backgroundColor: "#f49a31"}}>
                <input type="radio" checked={values.eventColor === "#f49a31"}
                  onChange={handleChange}
                  value="#f49a31"
                  name="eventColor" />
                <i className="checkbox-icon"></i>
              </div>
                
              </div>
           
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
         
          </div>

       )}
      </Formik>
    </div>
  );
}

export default EventAddForm;
