import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Radio,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import ButtonWithLoading from "../../components/ButtonWithLoading";
import DialogComponent from "../../components/Dialog";

export const CustomerAppsDialog = ({
  customerAppsList,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedApp, setSelectedApp] = useState({});

  return (
    <DialogComponent
      title="Select Organization"
      open={isOpen}
      onClose={onClose}
    >
      <DialogContent style={{ width: "300px" }}>
        {customerAppsList?.map((app) => {
          return (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2">{app.organizationName===null?"Clic Rent":app.organizationName}</Typography>
              <Radio
                checked={app.customerId === selectedApp?.customerId}
                onChange={() => setSelectedApp(app)}
              />
            </Box>
          );
        })}
      </DialogContent>
      <DialogActions
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <ButtonWithLoading
            title="Use"
            variant="contained"
            color="primary"
            onClick={() => onSubmit(selectedApp)}
          />
        </Box>
      </DialogActions>
    </DialogComponent>
  );
};
