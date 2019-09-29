import React, { createContext, useContext, useReducer } from 'react';
import { userInitialState, userActions } from './userActions';

const initialState = {
  ...userInitialState
};

const StoreContext = createContext(initialState);

// this will act as a map of actions that will trigger state mutations
const Actions = {
  ...userActions
};

const reducer = (state, action) => {
  const act = Actions[action.type];
  const args = action.args || {};
  const update = act(state, args);
  return { ...state, ...update };
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// export const useStateValue = () => useContext(GlobalStateContext);

export const useStore = store => {
  const { state, dispatch } = useContext(StoreContext);
  return { state, dispatch };
};
