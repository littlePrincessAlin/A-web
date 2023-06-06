// app
import React from 'react';
import { useContext, useState } from 'react';
import { globalContext } from '@context/GlobalContext';
import RouterComponent from '@/router/index'

const App = () => {
  // const GlobalContext = useContext(globalContext);
  // console.log('GlobalContext', GlobalContext);
  const [personInfo, setPersonInfo] = useState({
    userName: '',
    password: '',
  });
  return (
    <globalContext.Provider value={personInfo}>
      <RouterComponent />
    </globalContext.Provider>
  )
}

export default App
