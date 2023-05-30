import {colors } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles'
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: "#233044",
      light: "#f33333",
      dark: "#1e293a",
      contrastText: "#eeeeee",
    },
    secondary: {
      main: "#333",
      dark: "#232323",
      light: "#5b5b5b",
      contrastText: "#ffffff",
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows,
  typography,
});

theme.props = {
  MuiButton: {
    disableElevation:true,
  },
};

theme.overrides={
  MuiButton:{
    root:{
      textTransform:"none"
    }
  }
}

export default theme;
