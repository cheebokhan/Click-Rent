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
  Dialog,
  TextField,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { ClassicTextEditor } from "../../../components/TextEditor";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import { Get, Post } from "../../../actions";
import {
  Get_ReminderTemplate_URL,
  Get_SendManualReminders_URL,
  Post_SendReminderEmailToTenant_URL,
} from "../../../constants/apiUrls";
import { useSnackbar } from "notistack";
import { getTranslation } from "../../../heplers/translationHelper";
import DialogComponent from "../../../components/Dialog";

export const ReminderTemplateDialog = ({
  sendManually,
  reminderToTenant,
  isOpen,
  onClose,
  sendByPost
}) => {
  console.log("jksdghfjkgdsf", reminderToTenant);
  const { enqueueSnackbar } = useSnackbar();
  //const [reminderTemplateText, setReminderTempateText] = useState();
  const [enableReloading, setEnableReloading] = useState(false);
  const [reminderKey, setReminderKey] = useState(sendByPost?"FirstPostReminder":"FirstReminder");
  const [template, setTemplate] = useState("");
  const [subject, setSubject] = useState("");

  const [submitReminderLoading, setSubmitReminderLoading] = useState(false);

  useEffect(() => {
    GetReminderTemplate(reminderKey);
  }, []);

  const SendMenualReminder = () => {
    setSubmitReminderLoading(true);
    Post(
      {
        tenantId: reminderToTenant?.id,
        templateText: template,
        subject: subject,
      },
      sendManually
        ? Post_SendReminderEmailToTenant_URL
        : Get_SendManualReminders_URL,
      null,
      (resp) => {
        enqueueSnackbar("Reminders sent", { variant: "success" });
        setSubmitReminderLoading(false);
        onClose(false);
      },
      (error) => {
        enqueueSnackbar(error?.data, { variant: "error" });
        setSubmitReminderLoading(false);
        onClose(false);
      }
    );
  };

  useEffect(() => {
    GetReminderTemplate(reminderKey);
  }, [reminderKey]);

  const GetReminderTemplate = (reminderKey) => {
    Get(
      { reminderKey: reminderKey },
      Get_ReminderTemplate_URL,
      null,
      (resp) => {
        //setReminderTempateText(resp?.data?.template);
        setTemplate(resp?.data?.template != null ? resp?.data?.template : " ");
        setSubject(resp?.data?.subject != null ? resp?.data?.subject : " ");
        setEnableReloading(true);
      },
      (error) => {
        enqueueSnackbar(error.data, { variant: "error" });
      }
    );
  };

  const AppendTemplate = (text) => {
    setTemplate(template + "  " + text);
    setEnableReloading(true);
  };

  return (
    <>
      <DialogComponent open={isOpen} onClose={onClose} maxWidth
            title={getTranslation("Reminder", "Rappel", "Erinnerung")}
            >
          <ToggleButtonGroup
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            size="small"
            id="reminderKey"
            value={reminderKey}
            exclusive
            onChange={(event, reminderkey) => {
              setReminderKey(reminderkey);
            }}
          >
            <ToggleButton value={sendByPost ? "FirstPostReminder" : "FirstReminder"} aria-label="left aligned">
              <Typography variant="h6">
                {getTranslation(
                  "1st Reminder",
                  "1er rappel",
                  "Erste Erinnerung"
                )}
              </Typography>
            </ToggleButton>
            <ToggleButton value={sendByPost ? "SecondPostReminder" : "SecondReminder"} aria-label="left aligned">
              <Typography variant="h6">
                {getTranslation(
                  "2nd Reminder",
                  "2ème rappel",
                  "Zweite Erinnerung"
                )}
              </Typography>
            </ToggleButton>
            <ToggleButton value={sendByPost ? "ThirdPostReminder" : "ThirdReminder"} aria-label="centered">
              <Typography variant="h6">
                {getTranslation(
                  "3rd Reminder",
                  "3ème rappel",
                  "Dritte Erinnerung"
                )}
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
            <Grid container spacing={2}>
            {sendByPost ? null :
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  required
                  id="subject"
                  label={getTranslation("Subject", "Matière", "Thema")}
                  name="subject"
                  size="small"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              }
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h5">
                  {getTranslation(
                    "Reminder Text",
                    "Texte de rappel",
                    "Erinnerungstext"
                  )}
                </Typography>
              </Grid>
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
                    onClick={() => AppendTemplate("<span>[tenant_name]</span>")}
                  >
                    {getTranslation("Name  :  ", "Nom  :  ", "Name  :  ")}
                  </Button>
                  <Button
                    size="medium"
                    style={{ marginRight: "20px", border: "1px solid" }}
                    onClick={() =>
                      AppendTemplate("<span>[tenant_email]</span>")
                    }
                  >
                    {getTranslation("Email", "Email", "Email")}
                  </Button>
                  <Button
                    size="medium"
                    style={{ marginRight: "20px", border: "1px solid" }}
                    onClick={() => AppendTemplate("<span>[due_Amount]</span>")}
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
                      AppendTemplate("<span>[tenant_appartment]</span>")
                    }
                  >
                    {getTranslation("Apartment", "Logement", "Wohnungen")}
                  </Button>
                  <Button
                    size="medium"
                    style={{ marginRight: "20px", border: "1px solid" }}
                    onClick={() => AppendTemplate("<span>[due_Date]</span>")}
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
                      AppendTemplate("<span>[tenant_reference]</span>")
                    }
                  >
                    {getTranslation("Reference", "Reference", "Reference")}
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          
        <Card>
          <CardHeader
            title={getTranslation(
              "1st Reminder",
              "1er Rappel",
              "1. Erinnerung"
            )}
            style={{ background: "#233044", color: "#FFFFFF" }}
          />
          <CardContent>
            <ClassicTextEditor
              enableReload={enableReloading}
              onReloaded={() => {
                setEnableReloading(false);
              }}
              title={getTranslation(
                "1st Reminder",
                "1er Rappel",
                "1. Erinnerung"
              )}
              text={template}
              onChange={(text) => setTemplate(text)}
            />
            <br />
            <Box
              pr={1}
              pb={1}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ButtonWithLoading
                title={getTranslation("Send","Send","Send")}
                size="small"
                variant="contained"
                color="primary"
                type="submit"
                loading={submitReminderLoading}
                onClick={SendMenualReminder}
              />
            </Box>
          </CardContent>
        </Card>
      </DialogComponent>
    </>
  );
};
