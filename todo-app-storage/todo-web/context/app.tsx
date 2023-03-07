import React from 'react';
import { IProviderProps, IToast } from '../interfaces';

const App = React.createContext({});

export function useApp() {
  return React.useContext(App);
}

export const AppProvider = ({ children }: IProviderProps) => {
  const [toast, setToast] = React.useState({
    display: false,
    success: false,
    message: ''
  })

  const toggleToast = (state: IToast) => setToast(state);

  return (
    <App.Provider value={{ toast, toggleToast }}>
      {children}
    </App.Provider>
  )
}
