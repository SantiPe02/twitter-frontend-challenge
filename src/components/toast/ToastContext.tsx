import { createContext } from "react";
import Toast, { ToastType } from "./Toast";
import React from "react";

interface ToastContextType {
  message: string;
  type: ToastType;
  setToastMessage: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = (props: any) => {
  const [toast, setToast] = React.useState({
    message: "",
    type: ToastType.ALERT,
    show: false,
  });

  const setToastMessage = (message: string, type: ToastType) => {
    setToast({ message, type, show: true });
  };

  const value = {
    ...toast,
    setToastMessage,
  };

  const { children } = props;
  return (
    <ToastContext.Provider value={value}>
      {toast.message && (
        <Toast message={toast.message} type={toast.type} />
      )}
      {children}
    </ToastContext.Provider>
  );
};
