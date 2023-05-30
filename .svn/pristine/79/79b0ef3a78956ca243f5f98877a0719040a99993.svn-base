import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import ButtonWithLoading from "../../components/ButtonWithLoading";
import {FormLoader} from "../../components/FormLoader";

import { Get, Post } from "../../actions";
import {
  Get_EnableSMSAutomaticSendReminder_URL,
  Get_SMSReminderTemplate_URL,
  Post_EnableSMSAutomaticSendReminder_URL,
  Post_UpdateSMSReminderTemplate_URL,
} from "../../constants/apiUrls";
import { useSnackbar } from "notistack";
import { getTranslation } from "../../heplers/translationHelper";
import authService from "../../utils/authUtils";
import { UpgradeSMSReminder } from "../common/UpgradeSMSReminder";

export const SMSReminderSettings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [reminderTemplate, setReminderTempate] = useState({});
  const [reminderTemplateLoading, setReminderTempateLoaading] = useState(false);
  const [SMSReminderCheck, setSMSReminderCheck] = useState(false);
  const [reminderKey, setReminderKey] = useState("FirstSMSReminder");

  useEffect(() => {
    Get(
      {},
      Get_EnableSMSAutomaticSendReminder_URL,
      null,
      (resp) => {
        setSMSReminderCheck(resp?.data?.enableSMSAutoReminder);
        if (resp?.data?.enableSMSAutoReminder) {
          GetReminderTemplate("FirstSMSReminder");
        }
      },
      (error) => {}
    );
  }, []);
  useEffect(() => {
    GetReminderTemplate(reminderKey);
  }, [reminderKey]);
  const GetReminderTemplate = (reminderKey) => {
    setReminderTempateLoaading(true);
    Get(
      { reminderKey: reminderKey },
      Get_SMSReminderTemplate_URL,
      null,
      (resp) => {
        setReminderTempate(resp?.data);
        setReminderTempateLoaading(false);
      },
      (error) => {
        enqueueSnackbar("Some thing went wrong", { variant: "error" });
      }
    );
  };
const AppendTemplate = (template, text,setFieldValue) => {
  var template = template + text
  setFieldValue("template", template)
};
  const initialValues = {
    dayOfMonth: 0,
    template: "",
  };

  const basicValidationSchema = Yup.object().shape({
    template: Yup.string().required("Reminder text is required"),
    dayOfMonth: Yup.number().min(1),
  });
  const defaultValue = reminderTemplate ? reminderTemplate : initialValues;
  return (
    authService.getIsStarter()==true? <UpgradeSMSReminder/> :
    <>
      <FormControl>
        <FormControlLabel
          label={getTranslation("Enable SMS Reminder", "Activer le rappel par SMS", "SMS-Erinnerung aktivieren")}
          labelPlacement="start"
          control={
            <Checkbox
              id="SMSReminderCheck"
              checked={SMSReminderCheck}
              onChange={(e, check) => {
                console.log("shkjgsfgf", check);
                setSMSReminderCheck(check);
                Post(
                  { enableReminder: check },
                  Post_EnableSMSAutomaticSendReminder_URL,
                  null,
                  (resp) => {
                    GetReminderTemplate("FirstSMSReminder");
                  },
                  (error) => {}
                );
              }}
            />
          }
        />
      </FormControl>
      {SMSReminderCheck ? (
        <div>
          <ToggleButtonGroup
            size="small"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            id="reminderKey"
            value={reminderKey}
            exclusive
            onChange={(event, key) => {
              setReminderKey(key);
            }}
          >
            <ToggleButton value="FirstSMSReminder" aria-label="left aligned">
              <Typography variant="h6">{getTranslation("1st Reminder", "1er rappel", "Erste Erinnerung")}</Typography>
            </ToggleButton>
            <ToggleButton value="SecondSMSReminder" aria-label="left aligned">
              <Typography variant="h6">{getTranslation("2nd Reminder", "2�me rappel", "Zweite Erinnerung")}</Typography>
            </ToggleButton>
            <ToggleButton value="ThirdSMSReminder" aria-label="centered">
              <Typography variant="h6">{getTranslation("3rd Reminder", "3�me rappel", "Dritte Erinnerung")}</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
          <br/>
          <br/>
          <FormLoader progress={reminderTemplateLoading}>
            <Formik
              enableReinitialize
              initialValues={defaultValue}
              validationSchema={basicValidationSchema}
              onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                values.reminderKey = reminderKey;
                Post(
                  values,
                  Post_UpdateSMSReminderTemplate_URL,
                  null,
                  (resp) => {
                    actions.setSubmitting(false);
                    enqueueSnackbar("Reminder Template Updated", {
                      variant: "success",
                    });
                  },
                  (error) => {
                    actions.setSubmitting(false);
                    enqueueSnackbar(error.data, { variant: "error" });
                  }
                );
              }}
            >
              {({
                values,
                setFieldValue,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                getFieldProps,
              }) => (
                <>
                  <Form>
                    <>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            required
                            type="number"
                            id="dayOfMonth"
                            label={getTranslation("Interval (Days)", "Intervalle (jours)", "Intervall (Tage)")}
                            name="dayOfMonth"
                            size="small"
                            {...getFieldProps("dayOfMonth")}
                            error={
                              touched.dayOfMonth && Boolean(errors.dayOfMonth)
                            }
                            helperText={touched.dayOfMonth && errors.dayOfMonth}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9}></Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography variant="h5">{getTranslation("Reminder Text", "Texte de rappel", "Erinnerungstext")}</Typography>
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
                              style={{
                                marginRight: "20px",
                                border: "1px solid",
                              }}
                              onClick={() => {
                                AppendTemplate(
                                  values.template,
                                  "[tenant_name]",
                                  setFieldValue
                                );
                              }}
                            >
                              {getTranslation(
                                "Name  :  ",
                                "Nom  :  ",
                                "Name  :  "
                              )}
                            </Button>
                            <Button
                              size="medium"
                              style={{
                                marginRight: "20px",
                                border: "1px solid",
                              }}
                              onClick={() =>
                                AppendTemplate(
                                  values.template,
                                  "[tenant_email]",
                                  setFieldValue
                                )
                              }
                            >
                              {getTranslation("Email", "Email", "Email")}
                            </Button>
                            <Button
                              size="medium"
                              style={{
                                marginRight: "20px",
                                border: "1px solid",
                              }}
                              onClick={() =>
                                AppendTemplate(
                                  values.template,
                                  "[due_Amount]",
                                  setFieldValue
                                )
                              }
                            >
                              {getTranslation(
                                "Due Amount",
                                "Montant dû",
                                "Geburtstermin"
                              )}
                            </Button>
                            <Button
                              size="medium"
                              style={{
                                marginRight: "20px",
                                border: "1px solid",
                              }}
                              onClick={() =>
                                AppendTemplate(
                                  values.template,
                                  "[tenant_appartment]",
                                  setFieldValue
                                )
                              }
                            >
                              {getTranslation(
                                "Apartment",
                                "Logement",
                                "Wohnungen"
                              )}
                            </Button>
                            <Button
                              size="medium"
                              style={{
                                marginRight: "20px",
                                border: "1px solid",
                              }}
                              onClick={() =>
                                AppendTemplate(
                                  values.template,
                                  "[due_Date]",
                                  setFieldValue
                                )
                              }
                            >
                              {getTranslation(
                                "Due Date",
                                "Date d'échéance",
                                "Geburtstermin"
                              )}
                            </Button>
                          </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Card>
                            <CardHeader
                              title={
                                reminderKey === "FirstSMSReminder"
                                  ? "1st Reminder"
                                  : reminderKey === "SecondSMSReminder"
                                  ? "2nd Reminder"
                                  : "3rd Reminder"
                              }
                              style={{
                                background: "#233044",
                                color: "#FFFFFF",
                              }}
                            />
                            <CardContent>
                              <TextField
                                multiline
                                id="template"
                                fullWidth
                                label={getTranslation("Template", "Mod�le", "Vorlage")}
                                value={values.template}
                                required
                                size="small"
                                variant="outlined"
                                onChange={(event, text) => {
                                  setFieldValue("template", text);
                                }}
                                name={"template"}
                                {...getFieldProps("template")}
                                error={
                                  touched.comments && Boolean(errors.comments)
                                }
                                helperText={touched.comments && errors.comments}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                              <br />
                              <Box
                                pr={1}
                                pb={1}
                                pt={1}
                                width="100%"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <ButtonWithLoading
                                  title={getTranslation(
                                    "Save",
                                    "sauvegarder",
                                    "Speichern"
                                  )}
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  loading={isSubmitting}
                                  onClick={handleSubmit}
                                />
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </>
                  </Form>
                </>
              )}
            </Formik>
          </FormLoader>
        </div>
      ) : null}
      <br />
    </>
  );
};
