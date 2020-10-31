import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { accountService, alertService } from "../../_services/index";

function ResetPassword({ history }) {
  const TokenStatus = {
    Validating: "Validating",
    Valid: "Valid",
    Invalid: "Invalid",
  };

  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);

    // remove token from url to prevent http referer leakage
    history.replace(window.location.pathname);

    accountService
      .validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
  }, []);

  function getForm() {
    const initialValues = {
      password: "",
      confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });

    function onSubmit({ password, confirmPassword }, { setSubmitting }) {
      alertService.clear();
      accountService
        .resetPassword({ token, password, confirmPassword })
        .then(() => {
          alertService.success("Password reset successful, you can now login", {
            keepAfterRouteChange: true,
          });
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
            <div >
              <div className="event-form-register-footer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="event-form-register-submit"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Reset Password
                </button>
                <Link className="event-form-login-link" to="login">
                  Cancel
                </Link>
              </div>
            </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }

  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm();
      case TokenStatus.Invalid:
        return (
          <div>
            Token validation failed, if the token has expired you can get a new
            one at the <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
      case TokenStatus.Validating:
        return <div>Validating token...</div>;
    }
  }

  return (
    <div>
      <h3 className="card-header">Reset Password</h3>
      <div className="card-body">{getBody()}</div>
    </div>
  );
}

export { ResetPassword };
