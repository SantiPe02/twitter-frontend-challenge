import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useToastContext } from "../../../hooks/useToastContext";
import { ToastType } from "../../../components/toast/Toast";

interface SignUpData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpPage = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setToastMessage } = useToastContext();

  const handleSubmit = async (values: SignUpData, { setSubmitting }: any) => {
    console.log(values);
    const { confirmPassword, ...requestData } = values;
    httpRequestService
      .signUp(requestData)
      .then(() => navigate("/"))
      .catch((error) => {
        if (error.response?.status === 409) {
          setError(true);
          setToastMessage("Username or email already exists", ToastType.ALERT);
        } else {
          setError(true);
          setToastMessage("Check your credentials and try again", ToastType.ALERT);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const signupSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Must contain at least one uppercase and lowercase letter, and one number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <p className="error-message">{errorMsg}</p>
          <Formik
            initialValues={{
              name: "",
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, { setSubmitting });
            }}
          >
            {({ errors, touched }) => (
              <Form className="container">
                <div className={"input-container"}>
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="error-message"
                  />
                  <Field
                    required
                    name="name"
                    type="text"
                    placeholder={"Enter name..."}
                    title={t("input-params.name")}
                    error={(errors.name && touched.name) || error}
                    as={LabeledInput}
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="error-message"
                  />
                  <Field
                    required
                    name="username"
                    type="text"
                    placeholder={"Enter username..."}
                    title={t("input-params.username")}
                    error={(errors.username && touched.username) || error}
                    as={LabeledInput}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="error-message"
                  />
                  <Field
                    required
                    name="email"
                    type="email"
                    placeholder={"Enter email..."}
                    title={t("input-params.email")}
                    error={(errors.email && touched.email) || error}
                    as={LabeledInput}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="error-message"
                  />
                  <Field
                    name="password"
                    type="password"
                    required
                    placeholder={"Enter password..."}
                    title={t("input-params.password")}
                    error={(errors.password && touched.password) || error}
                    as={LabeledInput}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="error-message"
                  />
                  <Field
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder={"Confirm password..."}
                    title={t("input-params.confirm-password")}
                    error={
                      (errors.confirmPassword && touched.confirmPassword) ||
                      error
                    }
                    as={LabeledInput}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    text={t("buttons.register")}
                    buttonType={ButtonType.FOLLOW}
                    size={"MEDIUM"}
                    type="submit"
                  />
                  <Button
                    text={t("buttons.login")}
                    buttonType={ButtonType.OUTLINED}
                    size={"MEDIUM"}
                    onClick={() => navigate("/sign-in")}
                    type="button"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
