import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function CircleLoader(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.loading?<Skeleton animation="wave" />: props.children }
    </div>
  );
}