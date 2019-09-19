import React, { useState } from 'react';

export const GlobalStateContext = React.createContext({
  isAuthenticated: false
});

const Store = ({ children }) => {
  const [value, setValue] = useState({
    isAuthenticated: false
  });

  return (
    <GlobalStateContext.Provider value={[value, setValue]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default Store;
