import React, {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import ContextData from './src/Realmdb/Screens/Context';
import RootNavg from './src/Realmdb/Screens/RootNavg';

export const User = createContext({
  mainData: [],
  setMainData: (i: any) => {},
});

const App = () => {
  const {memodata} = ContextData();
  return (
    <User.Provider value={memodata}>
      <RootNavg />
    </User.Provider>
  );
};

export default App;
