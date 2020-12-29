import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { accountService, alertService } from "../../_services/index";

function Login({ history, location }) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  function onSubmit({ email, password }, { setSubmitting }) {
    alertService.clear();
    accountService
      .login(email, password)
      .then(() => {
        const { from } = location.state || { from: { pathname: "/home" } };
        
        history.push(from);
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="event-form-login-body">
          <div className="event-form-login-input">
            <div className="event-form-login-fields">
              <label>Email</label>
              <Field
                name="email"
                type="text"
                className={
                  "form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="event-form-login-error"
              />
            </div>
            <div className="event-form-login-fields">
              <label>Password</label>
              <Field
                name="password"
                type="password"
                className={
                  "form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="event-form-login-error"
              />
            </div>
            <div>
              <div>
                <button
                  className="event-form-login-submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <span></span>}
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="event-form-login-options">
            <div>
              <Link className="event-form-login-link" to="register">Register</Link>
            </div>
            <div>
              <Link className="event-form-login-link"to="forgot-password">Forgot Password?</Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Login };
