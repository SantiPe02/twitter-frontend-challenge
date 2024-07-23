import React, { useEffect } from "react";
import { StyledToastContainer } from "./ToastContainer";
import { AlertIcon, SuccessIcon } from "../icon/Icon";
import { useToastContext } from "../../hooks/useToastContext";

export enum ToastType {
  ALERT = "ALERT",
  SUCCESS = "SUCCESS",
}

interface ToastProps {
  message: string;
  type: ToastType;
}

const Toast = ({ message, type }: ToastProps) => {
  const iconMap = {
    [ToastType.ALERT]: <AlertIcon />,
    [ToastType.SUCCESS]: <SuccessIcon />,
  };
  const { clearContext } = useToastContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearContext();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toastIcon = iconMap[type] || null;

  return (
    <>
      <StyledToastContainer type={type} onClick={() => {}}>
        {toastIcon}
        <p>{message}</p>
      </StyledToastContainer>
    </>
  );
};

export default Toast;
