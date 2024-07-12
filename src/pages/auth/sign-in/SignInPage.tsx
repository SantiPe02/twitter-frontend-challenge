import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import AuthWrapper from "../AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { Field, Form, Formik } from "formik";
import { useToastContext } from "../../../hooks/useToastContext";
import { ToastType } from "../../../components/toast/Toast";

const SignInPage = () => {
  const [error, setError] = useState(false);

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setToastMessage } = useToastContext();

  const handleSubmit = (values: { username: string; password: string }) => {
    httpRequestService
      .signIn(values)
      .then(() => navigate("/"))
      .catch(() => {
        setError(true);
        setToastMessage("Login toast", ToastType.ALERT);
      });
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt={"Twitter Logo"} />
            <StyledH3>{t("title.login")}</StyledH3>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}
          >
            <Form className="container">
              <div className={"input-container"}>
                <Field
                  name="username"
                  required
                  placeholder={"Enter user..."}
                  title={t("input-params.username")}
                  error={error}
                  as={LabeledInput}
                />
                <Field
                  name="password"
                  type="password"
                  required
                  placeholder={"Enter password..."}
                  title={t("input-params.password")}
                  error={error}
                  as={LabeledInput}
                />
                <p className={"error-message"}>{error && t("error.login")}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  text={t("buttons.login")}
                  buttonType={ButtonType.FOLLOW}
                  size={"MEDIUM"}
                  type="submit"
                />
                <Button
                  text={t("buttons.register")}
                  buttonType={ButtonType.OUTLINED}
                  size={"MEDIUM"}
                  onClick={() => navigate("/sign-up")}
                  type="button"
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignInPage;
