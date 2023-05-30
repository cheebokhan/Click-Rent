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
import { ClassicTextEditor } from "../../components/TextEditor";
import ButtonWithLoading from "../../components/ButtonWithLoading";
import { Get, Post } from "../../actions";
import {
  Get_EnableAutomaticSendReminder_URL,
  Get_ReminderTemplate_URL,
  Post_EnableAutomaticSendReminder_URL,
  Post_UpdateReminderTemplate_URL,
} from "../../constants/apiUrls";
import { useSnackbar } from "notistack";
import { FormLoader } from "../../components/FormLoader";
import { getTranslation } from "../../heplers/translationHelper";
import authService from "../../utils/authUtils";
import { UpgradeEmailReminder } from "../common/UpgradeEmailReminder";

export const ReminderSettings = ({ reminderType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [reminderTemplate, setReminderTempate] = useState({});
  const [reminderTemplateLoading, setReminderTempateLoading] = useState(false);
  const [enableReloading, setEnableReloading] = useState(false);
  const [autoReminderCheck, setAutoReminderCheck] = useState(false);
  const [reminderKey, setReminderKey] = useState(reminderType == 'sendByPost' ? "FirstPostReminder" :"FirstReminder");

  useEffect(() => {
    Get(
      {},
      Get_EnableAutomaticSendReminder_URL,
      null,
      (resp) => {
        setAutoReminderCheck(resp?.data?.enableAutoReminder);
        if (resp?.data?.enableAutoReminder) {
          GetReminderTemplate(reminderType == 'sendByPost' ? "FirstPostReminder" : "FirstReminder");
        }
      },
      (error) => { }
    );
  }, []);

  useEffect(() => {
    GetReminderTemplate(reminderKey);
  }, [reminderKey]);
  const GetReminderTemplate = (reminderKey) => {
    setReminderTempateLoading(true);
    Get(
      { reminderKey: reminderKey },
      Get_ReminderTemplate_URL,
      null,
      (resp) => {
        setReminderTempate(resp?.data);
        setEnableReloading(true);
        setReminderTempateLoading(false);
      },
      (error) => {
        enqueueSnackbar(error.data, { variant: "error" });
      }
    );
  };
  const AppendTemplate = (template, text, setFieldValue) => {
    var template = template + text;
    setFieldValue("template", template);
    setEnableReloading(true);
  };
  const initialValues = {
    dayOfMonth: 0,
    template: "",
    subject: "",
  };

  const basicValidationSchema = Yup.object().shape({
    template: Yup.string().required("Reminder text is required"),
    dayOfMonth: Yup.number().min(1),
    subject: Yup.string().required(),
  });

  const basicPostValidationSchema = Yup.object().shape({
    template: Yup.string().required("Reminder text is required"),
  });
  const defaultValue = reminderTemplate ? reminderTemplate : initialValues;
  return authService.getIsStarter() == true ? (
    <UpgradeEmailReminder />
  ) : (
    <>
      {reminderType != 'sendByPost' ?
        <FormControl>
          <FormControlLabel
            label={getTranslation(
              "Enable Auto Reminder",
              "Activer le rappel automatique",
              "Automatische Erinnerung aktivieren"
            )}
            labelPlacement="start"
            control={
              <Checkbox
                id="autoReminderCheck"
                checked={autoReminderCheck}
                onChange={(e, check) => {
                  setAutoReminderCheck(check);
                  Post(
                    { enableReminder: check },
                    Post_EnableAutomaticSendReminder_URL,
                    null,
                    (resp) => {
                      GetReminderTemplate("FirstReminder");
                    },
                    (error) => { }
                  );
                }}
              />
            }
          />
        </FormControl> : null}
      {autoReminderCheck || reminderType == 'sendByPost' ? (
        <div>
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
            <ToggleButton value={reminderType == "sendByPost" ? "FirstPostReminder" : "FirstReminder"} aria-label="left aligned">
              <Typography variant="h6">
                {getTranslation(
                  "1st Reminder",
                  "1er rappel",
                  "Erste Erinnerung"
                )}
              </Typography>
            </ToggleButton>
            <ToggleButton value={reminderType == "sendByPost" ? "SecondPostReminder" : "SecondReminder"} aria-label="left aligned">
              <Typography variant="h6">
                {getTranslation(
                  "2nd Reminder",
                  "2ème rappel",
                  "Zweite Erinnerung"
                )}
              </Typography>
            </ToggleButton>
            <ToggleButton value={reminderType == "sendByPost" ? "ThirdPostReminder" : "ThirdReminder"} aria-label="centered">
              <Typography variant="h6">
                {getTranslation(
                  "3rd Reminder",
                  "3ème rappel",
                  "Dritte Erinnerung"
                )}
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
          <br />
          <br />
          <FormLoader progress={reminderTemplateLoading}>
            <Formik
              enableReinitialize
              initialValues={defaultValue}
              validationSchema={reminderType == 'sendByPost' ? basicPostValidationSchema : basicValidationSchema}
              onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                values.reminderKey = reminderKey;
                Post(
                  values,
                  Post_UpdateReminderTemplate_URL,
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
                        {reminderType != "sendByPost" ? <>
                          <Grid item xs={12} sm={12} md={3} lg={3}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              required
                              type="number"
                              id="dayOfMonth"
                              label={getTranslation(
                                "Interval (Days)",
                                "Intervalle en jours",
                                "Interval (Tage)"
                              )}
                              name="dayOfMonth"
                              size="small"
                              //value={values.dayOfMonth}
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

                          <Grid item xs={12} sm={12} md={3} lg={3}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              required
                              id="subject"
                              label={getTranslation(
                                "Subject",
                                "Matière",
                                "Thema"
                              )}
                              name="subject"
                              size="small"
                              //value={values.dayOfMonth}
                              {...getFieldProps("subject")}
                              error={touched.subject && Boolean(errors.subject)}
                              helperText={touched.subject && errors.subject}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                        </>
                          : null}
                        <Grid item xs={12} sm={12} md={9} lg={9}></Grid>
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
                              style={{
                                marginRight: "20px",
                                border: "1px solid",
                              }}
                              onClick={() => {
                                AppendTemplate(
                                  values.template,
                                  "<span>[tenant_name]</span>",
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
                                  "<span>[tenant_email]</span>",
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
                                  "<span>[due_Amount]</span>",
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
                                  "<span>[tenant_appartment]</span>",
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
                                  "<span>[due_Date]</span>",
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
                            <Button
                              size="medium"
                              style={{
                                marginRight: "20px",
                                border: "1px solid",
                              }}
                              onClick={() =>
                                AppendTemplate(
                                  values.template,
                                  "<span>[tenant_reference]</span>",
                                  setFieldValue
                                )
                              }
                            >
                              {getTranslation(
                                "Reference",
                                "Reference",
                                "Reference"
                              )}{" "}
                              :
                            </Button>
                          </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Card>
                            <CardHeader
                              title={
                                reminderKey === "FirstReminder"
                                  ? getTranslation(
                                    "1st Reminder",
                                    "1er Rappel",
                                    "1. Erinnerung"
                                  )
                                  : reminderKey === "SecondReminder"
                                    ? getTranslation(
                                      "2nd Reminder",
                                      "2ème Rappel",
                                      "2nd Erinnerung"
                                    )
                                    : getTranslation(
                                      "Reminder 3",
                                      "Rappel 3",
                                      "Erinnerung 3"
                                    )
                              }
                              style={{
                                background: "#233044",
                                color: "#FFFFFF",
                              }}
                            />
                            <CardContent>
                              <ClassicTextEditor
                                enableReload={enableReloading}
                                onReloaded={() => {
                                  setEnableReloading(false);
                                }}
                                title={reminderKey}
                                text={
                                  values.template === null
                                    ? ""
                                    : values.template
                                }
                                onChange={(text) => {
                                  setEnableReloading(true);
                                  setFieldValue("template", text);
                                  setEnableReloading(false);
                                }}
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
