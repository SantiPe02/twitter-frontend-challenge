import React from "react";
import { ToastContext } from "../components/toast/ToastContext";

export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  const clearContext = () => {
    context.setToastMessage("", context.type);
  };
  return { ...context, clearContext };
};
