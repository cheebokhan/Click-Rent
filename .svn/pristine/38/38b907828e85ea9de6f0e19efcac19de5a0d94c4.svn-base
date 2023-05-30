import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    width: `calc(100% - ${256}px)`,
    marginLeft: 256,
    backgroundColor: theme.palette.common.white,
    mozBoxShadow: "0 0 5px rgba(0,0,0,0.1)",
    webkitBoxShadow: "0 0 5px rgba(0,0,0,0.1)",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    color: theme.palette.common.black,
  },
  rootshift: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${0}px)`,
    marginLeft: 0,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    minHeight: 65,
  },
  menuButton: {
    color: "#444",
  },
  avatar: {
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    fontSize: "16px",
    letterSpacing: "2px",
    marginLeft:theme.spacing(3),
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      backgroundColor: theme.palette.primary.dark,
    },
  },
  menuBar: {
    marginTop: theme.spacing(5.5),
  },
  profileMenuList: {
    padding:theme.spacing(1)
  },
  icon:{

    marginRight:theme.spacing(1),
    fontSize:theme.spacing(2.3)
  }
}));

export default useStyles;
