import React, { useReducer, createContext, useContext } from 'react';

const initialValue = {
  menuOpen : true,
  token: "",
  messageBoxFlag: false,
  messageBoxContent: "",
  platformId: "",
  zoneId : "",
  tenantId: "",
  tierId: "",
  accessKey: "",
  secretKey: "",
}

function menuReducer(state, action) {

  switch(action.type) {
    case 'UPDATE':
      return action.data;      
    default:
      throw new Error(`Unhandled action type : ${action.type}`);      
  }
}

const MenuStateContext = createContext(); 
const MenuDispatchContext = createContext(); 

export function MenuProvider({children}) {
  const[state, dispatch] = useReducer(menuReducer, initialValue);

  return (
    <MenuStateContext.Provider value={state}>
      <MenuDispatchContext.Provider value={dispatch}>        
        {children}        
      </MenuDispatchContext.Provider>
    </MenuStateContext.Provider>
  );
}

export function useMenuState() {
  const context = useContext(MenuStateContext);
  if(!context) {
    // throw new Error('Cannot find MenuProvider');
  }
  return context;
}

export function useMenuDispatch() {
  const context = useContext(MenuDispatchContext);
  if(!context) {
    throw new Error('Cannot find MenuProvider');
  }
  return context;
}

