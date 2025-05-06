import React, { createContext, useContext, useState, ReactNode } from "react";
import style from "./index.module.css";

type ToastType = "success" | "error" | "warning";

interface ToastMessage {
  text: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ text: message, type });
    setTimeout(() => {
      setToast(null);
    }, 10000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={style.toast + " " + style[`toast-${toast.type}`]}>
          {toast.text}
        </div>
      )}
    </ToastContext.Provider>
  );
};
