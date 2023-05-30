import React from "react";
import { Button, CircularProgress } from "@material-ui/core";

const ButtonWithLoading = ({
  title,
  size,
  variant,
  loading,
  color,
  ...rest
}) => {
  return (
    <Button
      size={size}
      color={color}
      variant={variant}
      disabled={loading}
      startIcon={
        loading ? (
          <CircularProgress thickness={3} size={22} color={color} />
        ) : null
      }
      {...rest}
    >
      {title}
    </Button>
  );
};

export default ButtonWithLoading;
