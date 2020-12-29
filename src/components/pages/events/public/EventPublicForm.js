import React from "react";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { eventService, alertService } from "../../../../_services/index";


function EventPublicForm(props, {history}) {

   
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

          </div>





        )}
      </Formik>
    </div>
  );
}

export default EventPublicForm;
