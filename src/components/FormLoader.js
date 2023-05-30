import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles';
export const FormLoader = ({progress,children})=>{

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
      }));
      const classes = useStyles();
    return  (
        progress ? <div className={classes.root}><LinearProgress /> </div> : children
        )
    
}