import React from "react";
import AppRouter from "./Router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";
import { loadUserFromLocalStorage } from "./store/slices/authSlice";

const App: React.FC = () => {
  store.dispatch(loadUserFromLocalStorage());

  return (
    <Provider store={store}>
      <Toaster />
      <AppRouter />
    </Provider>
  );
};

export default App;
