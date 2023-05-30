import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  
  mobileDrawer: {
    width: 256,
    backgroundColor: theme.palette.background.primary,
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    height: "calc(100% )",
    backgroundColor: theme.palette.background.primary,
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  sidebarLogo: {
    maxWidth: 100,
  },
  logout: {
    borderRadius: 0,
    backgroundColor: "transparent",
  },
}));

export default useStyles;