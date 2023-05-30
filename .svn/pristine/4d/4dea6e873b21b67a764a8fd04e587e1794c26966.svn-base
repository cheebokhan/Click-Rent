import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import App from "./App";
import theme from "./theme";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={5} anchorOrigin={{
        vertical:"top",
        horizontal:"center"
      }} 
      autoHideDuration={5000}
      disableWindowBlurListener
      preventDuplicate
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
