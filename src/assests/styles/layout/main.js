import {makeStyles} from "@material-ui/core"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    
  },
  contentContainer: {
    minHeight: "90vh",
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    padding: theme.spacing(2, 3),
  },
  content: {
    flexGrow: 1,
    overflow: "scroll",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop:"50px"
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  breadcrums: {
    padding: theme.spacing(0.2),
    backgroundColor: theme.palette.primary.dark,
    mozBoxShadow: "0 0 5px rgba(0,0,0,0.1)",
    webkitBoxShadow: "0 0 5px rgba(0,0,0,0.1)",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    borderRadius: theme.spacing(1),
  },
}));

export default useStyles