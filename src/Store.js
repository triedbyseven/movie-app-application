import React, { useState } from 'react';

export const GlobalStateContext = React.createContext({
  isAuthenticated: false,
  userId: ''
});

const Store = ({ children }) => {
  const [value, setValue] = useState({
    isAuthenticated: false,
    userId: ''
  });

  return (
    <GlobalStateContext.Provider value={[value, setValue]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default Store;
