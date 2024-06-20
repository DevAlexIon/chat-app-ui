import React from "react";
import AppRouter from "./Router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Toaster />
      <AppRouter />
    </Provider>
  );
};

export default App;
