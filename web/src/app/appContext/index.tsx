import React, { createContext, useContext, useState, ReactNode } from "react";
import style from "./index.module.css";
import { State } from "document/types/processTypes";

type ToastType = "success" | "error" | "warning";

interface ToastMessage {
  text: string;
  type: ToastType;
}

interface AppContextProps {
  showToast: (message: string, type: ToastType) => void;
  states: State[] | null;
  setStates: React.Dispatch<React.SetStateAction<State[] | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Algo deu errado, contexto não encontrado");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [states, setStates] = useState<State[] | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ text: message, type });
    setTimeout(() => {
      setToast(null);
    }, 10000);
  };

  return (
    <AppContext.Provider value={{ showToast, states, setStates }}>
      {children}
      {toast && (
        <div className={style.toast + " " + style[`toast-${toast.type}`]}>
          {toast.text}
        </div>
      )}
    </AppContext.Provider>
  );
};
