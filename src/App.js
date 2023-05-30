import React from "react";
import GlobalStyles from "./components/GlobalStyles";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Auth from "./components/Auth";
const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <BrowserRouter>
      <Routes />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
