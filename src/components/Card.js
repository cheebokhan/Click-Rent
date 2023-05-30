import React from "react";
import { Card, Divider, CardHeader, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
  },
}));

const CardComponent = React.forwardRef(
  ({ title = "", children, ...rest }, ref) => {
    const classes = useStyles();
    return (
      <Card ref={ref} {...rest}>
        {title ? (
          <CardHeader className={classes.cardHeader} title={title} />
        ) : null}
        {/* <Divider /> */}
        {children}
      </Card>
    );
  }
);

export default CardComponent;
