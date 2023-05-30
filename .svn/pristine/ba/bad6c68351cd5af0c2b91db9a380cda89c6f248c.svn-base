import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { getUserData } from "../actions";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useCookies} from 'react-cookie'
import {
 Grid
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import authService from '../utils/authUtils';
import { SET_USER_DATA } from '../constants/types';

const Auth = (props) => {
/*const Auth = ({setAuth,userLoggedOut,onGetToken,onRefresh,children}) => {

  useEffect(()=>{
    setCookie("app-auth",setAuth)
  },[setAuth])

  
  useEffect(()=>{
    removeCookie("app-auth")
  },[userLoggedOut])
  const [cookies, setCookie, removeCookie] = useCookies(['app-auth']);
  */
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true)

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  const initAuth = async () => {
    if(authService.isAuthenticated() || authService.isRefreshAuthenticated()){
    dispatch(getUserData(resp=>{
     dispatch({type:SET_USER_DATA,payload:resp.data})
    },error=>{
      enqueueSnackbar(error.data,{variant:"error"})
      history.push("/login")        

    }))
  }else{
      if (window.location.pathname.includes('market'))
        history.push("/register")
      else
        history.push("/login")
  }
    


 /*   await dispatch(()=>{
      if (cookies['app-auth']) {
        const auth = cookies['app-auth'];
        if (auth.expiryDate < new Date() && auth.refreshExpiryDate > new Date())
          onRefresh(auth.refreshToken)
        else
          onGetToken()
      }
      
    }); */
    setLoading(false);
  };

  useEffect(() => {
    initAuth();
  }, [])
  if (loading)
    return <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Grid>
  return props.children;
}

export default Auth
