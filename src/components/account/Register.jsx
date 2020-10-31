import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup"; 

import { accountService, alertService } from "../../_services/index";

function Register({ history }) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string(),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService
      .register(fields)
      .then(() => {
        alertService.success(
          "Registration successful, please check your email for verification instructions",
          { keepAfterRouteChange: true }
        );
        history.push("login");
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
                <label>First Name</label>
                <Field
                  name="firstName"
                  type="text"
                  className={
               
                    (errors.firstName && touched.firstName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="event-form-login-error"
                />
              </div>
              <div className="event-form-login-fields">
                <label>Last Name</label>
                <Field
                  name="lastName"
                  type="text"
                  className={
              
                    (errors.lastName && touched.lastName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="event-form-login-error"
                />
              </div>
          
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
            <div>
            <div className="event-form-login-fields">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="event-form-login-error"
                />
              </div>
              <div className="event-form-login-fields">
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={
                
                    (errors.confirmPassword && touched.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="event-form-login-error"
                />
              </div>
            </div>
            </div>
            <div className="event-form-register-terms">
              <Field
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                className={
                  "event-form-register-terms-check" +
                  (errors.acceptTerms && touched.acceptTerms
                    ? " is-invalid"
                    : "")
                }
              />
              <label htmlFor="acceptTerms">
                Accept Terms & Conditions
              </label>
              <ErrorMessage
                name="acceptTerms"
                component="div"
                className="event-form-login-error"
              />
            </div>
            <div className="event-form-register-footer">
              <button
              className="event-form-register-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span></span>
                )}
                Register
              </button>
              <Link className="event-form-login-link" to="login">
                Cancel
              </Link>
            </div>
    
        </Form>
      )}
    </Formik>
  );
}

export { Register };
