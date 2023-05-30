import React, { useEffect, useState } from "react";

import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box,
  ButtonGroup,
  Button,
  DialogContent,
} from "@material-ui/core";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import {Post } from "../../../actions";
import {Post_SendSMSReminderToTenant_URL} from "../../../constants/apiUrls";
import { useSnackbar } from "notistack";
import { getTranslation } from "../../../heplers/translationHelper";
import { useRef } from "react";
import DialogComponent from "../../../components/Dialog";

export const SMSReminderTemplateDialog = ({
  reminderToTenant,
  isOpen,
  onClose,
  sendByPost,
  onSubmit
}) => {
  const { enqueueSnackbar } = useSnackbar();
  //const [reminderTemplateText, setReminderTempateText] = useState();
  const [template, setTemplate] = useState("");

  const [submitReminderLoading, setSubmitReminderLoading] = useState(false);

  // useEffect(() => {
  //   GetReminderTemplate(reminderKey);
  // }, []);

  const SendMenualReminder = () => {
    if (sendByPost) {
      onSubmit(template)
    } else {
      setSubmitReminderLoading(true);
      Post(
        {
          tenantId: reminderToTenant?.id,
          templateText: template,
        },
        Post_SendSMSReminderToTenant_URL,
        null,
        (resp) => {
          enqueueSnackbar("Reminders sent", { variant: "success" });
          setSubmitReminderLoading(false);
          onClose(false);
        },
        (error) => {
          enqueueSnackbar(error?.data, { variant: "error" });
          setSubmitReminderLoading(false);
          // onClose(false);
        }
      );
    }

  };

  const textRef = useRef();

  const AppendTemplate = (text) => {
    setTemplate(template + " " + text);
    textRef.current.focus();
  };

  return (
    <>
      <DialogComponent open={isOpen} onClose={onClose} maxWidth
        title={sendByPost?  getTranslation("Send By Post", "Send By Post", "Send By Post") : getTranslation("SMS Reminder", "SMS Rappel", "SMS Erinnerung")}
      >
        <DialogContent>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h5">
                {getTranslation(
                  "Reminder Text",
                  "Texte de rappel",
                  "Erinnerungstext"
                )}
              </Typography>
            </Grid>
            {sendByPost? null:
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <ButtonGroup
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: "5px",
                }}
              >
                <Button
                  size="medium"
                  style={{ marginRight: "20px", border: "1px solid" }}
                  onClick={() => AppendTemplate("[tenant_name]")}
                >
                  {getTranslation("Name :", "Nom :", "Name :")}
                </Button>
                <Button
                  size="medium"
                  style={{ marginRight: "20px", border: "1px solid" }}
                  onClick={() =>
                    AppendTemplate("[tenant_email]")
                  }
                >
                  {getTranslation("Email", "Email", "Email")}
                </Button>
                <Button
                  size="medium"
                  style={{ marginRight: "20px", border: "1px solid" }}
                  onClick={() => AppendTemplate("[due_Amount]")}
                >
                  {getTranslation(
                    "Due Amount",
                    "Montant dû",
                    "Geburtstermin"
                  )}
                </Button>
                <Button
                  size="medium"
                  style={{ marginRight: "20px", border: "1px solid" }}
                  onClick={() =>
                    AppendTemplate("[tenant_appartment]")
                  }
                >
                  {getTranslation("Apartment", "Logement", "Wohnungen")}
                </Button>
                <Button
                  size="medium"
                  style={{ marginRight: "20px", border: "1px solid" }}
                  onClick={() => AppendTemplate("[due_Date]")}
                >
                  {getTranslation(
                    "Due Date",
                    "Date d'échéance",
                    "Geburtstermin"
                  )}
                </Button>
                <Button
                  size="medium"
                  style={{ marginRight: "20px", border: "1px solid" }}
                  onClick={() =>
                    AppendTemplate("[tenant_reference]")
                  }
                >
                  {getTranslation("Reference", "Reference", "Reference")}
                </Button>
              </ButtonGroup>

            </Grid>
}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <textarea
                style={{ width: '100%', padding: '15px' }}
                ref={textRef}
                cols={10}
                rows={10}
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
              />
            </Grid>
            <Box
              pt={4}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ButtonWithLoading
                title={ sendByPost ? getTranslation("Print", "Print", "Print") : getTranslation("Send SMS Reminder", "Send SMS Reminder", "Send SMS Reminder")}
                size="small"
                variant="contained"
                color="primary"
                loading={submitReminderLoading}
                onClick={() => SendMenualReminder()}
              />

            </Box>

          </Grid>
        </DialogContent>
      </DialogComponent>
    </>
  );
};
