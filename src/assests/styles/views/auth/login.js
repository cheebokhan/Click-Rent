import {makeStyles} from "@material-ui/core"
const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  
  },
  logo: {
    height: "150px",
    width: "150px",
    marginBottom: theme.spacing(3),
  },
  loader: {
    color: theme.palette.common.white,
  },
  changeLoginColor: {
    color: theme.palette.primary.dark,
  },
}));

export default useStyles