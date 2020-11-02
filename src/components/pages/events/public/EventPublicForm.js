import React from "react";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { eventService, alertService } from "../../../../_services/index";

function EventPublicForm(props, {history}) {

console.log("props.startdate", props.startDate)
    var myEvent = props.events
    var gapi = window.gapi
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID = ""
  var API_KEY = ""
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': myEvent.eventName,
          'location': myEvent.location,
          'description': myEvent.description,
          'start': {
            'dateTime': '2020-06-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': '2020-06-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        

        /*
            Uncomment the following block to get events
        */
        /*
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        */
       console.log(event, "google")

      })
    })
  }



  const initialValues={
    name: "",
    email: "",
    description: "",

  }


  function onSubmit(values, { setStatus, setSubmitting }) {
    setStatus();
 
        createUser(values, setSubmitting);

}

function createUser(values, setSubmitting) {
    eventService.create(values)
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
          <div className="event-form-public">
            <div className="event-form-title-public">
              <h2>Enter Details</h2>
            </div>

            <form className="event-form-body-public" onSubmit={handleSubmit}>
              <div className="event-form-body-fields-public">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </div>
              <div className="event-form-body-fields-public">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <div className="event-form-body-fields-public">
                <label>Please share anything that will help prepare for our meeting.</label>
                <textarea
                  className="event-form-textarea-public"
                  name="description"
              
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                >
                  {" "}
                </textarea>
              </div>
             
           
              <Button type="submit" style={{marginTop: '30px'}} variant="contained" color="primary" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
            <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
          </div>





        )}
      </Formik>
    </div>
  );
}

export default EventPublicForm;
