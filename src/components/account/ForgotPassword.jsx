import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { accountService, alertService } from "../../_services/index";

function ForgotPassword() {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  function onSubmit({ email }, { setSubmitting }) {
    alertService.clear();
    accountService
      .forgotPassword(email)
      .then(() =>
        alertService.success(
          "Please check your email for password reset instructions"
        )
      )
      .catch((error) => alertService.error(error))
      .finally(() => setSubmitting(false));
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="event-form-login-body">
          <h3>Forgot Password</h3>
          <div className="event-form-login-input">
            <div className="event-form-login-fields">
              <label>Email</label>
              <Field
                name="email"
                type="text"
                className={
 
                  (errors.email && touched.email ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="event-form-login-error"
              />
            </div>
        
              <div className="event-form-register-footer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="event-form-register-submit"
                >
                  {isSubmitting && (
                    <span></span>
                  )}
                  Submit
                </button>
                <Link className="event-form-login-link" to="login" >
                  Cancel
                </Link>
              </div>
     
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { ForgotPassword };
