import React from "react";
import AppRouter from "./Router";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <div className="App">
      <Toaster />
      <AppRouter />
    </div>
  );
};

export default App;
