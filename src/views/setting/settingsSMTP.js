import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Grid,
  TextField,
  Tooltip,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { FormLoader } from "../../components/FormLoader";
import { Form, Formik } from "formik";
import ButtonWithLoading from "../../components/ButtonWithLoading";
import * as Yup from "yup";

import { useSnackbar } from "notistack";

import { Get, Post } from "../../actions";
import {
  Get_EmailSetting_URL,
  Post_UpsertEmailSetting_URL,
  Post_MakeDefaultSetting_URL,
} from "../../constants/apiUrls";
import { getTranslation } from "../../heplers/translationHelper";
import { EditButton } from "../../components/ButttonsWithIcons";
import { Alert } from "@material-ui/lab";
import { UpgradeSMTP } from "../common/UpgradeSMTP";
import authService from "../../utils/authUtils";

export const Settings = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [submitLoading, setSubmitLoaing] = useState(false);
  const [emailSettingLoading, setEmailSettingLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [emailSetting, setEmailSetting] = useState({
    hostname: "",
    username: "",
    password: "",
    port: 587,
  });
  const defualtSettingValues = {
    id: 1,
    hostname: "",
    username: "",
    password: "",
    port: 587,
    isDeleted: 0,
  };

  const onEmailSettingSubmit = async (values, actions) => {
    Post(
      values,
      Post_UpsertEmailSetting_URL,
      history,
      (resp) => {
        actions.setSubmitting(false);

        enqueueSnackbar("SMTP setting Upserted ", { variant: "success" });
      },
      (resp) => {
        actions.setSubmitting(false);
        enqueueSnackbar(resp.data, {
          variant: "error",
        });
      }
    );
  };

  const onSubmitDefaultSettings = () => {
    setSubmitLoaing(true);
    Post(
      {},
      Post_MakeDefaultSetting_URL,
      null,
      (resp) => {
        setSubmitLoaing(false);
        enqueueSnackbar("Defualt SMTP Settings Applied ", {
          variant: "success",
        });
        setDisabled(true);
      },
      (onError) => {
        setSubmitLoaing(false);
        enqueueSnackbar("Server error", {
          variant: "error",
        });
      }
    );
    console.log("jkjhgdfsjkdbg", defualtSettingValues);
  };
  const basicEmailSettingValidationSchema = Yup.object().shape({
    hostname: Yup.string().required("Hostname is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    port: Yup.number().min(1).required("Port is required"),
  });

  useEffect(() => {
    setEmailSettingLoading(true);
    Get(
      {},
      Get_EmailSetting_URL,
      null,
      (resp) => {
        setEmailSettingLoading(false);
        setEmailSetting(resp?.data);
        if (resp?.data?.username === "") {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      },
      (error) => {
        setEmailSettingLoading(false);
      }
    );
  }, []);

  const changeCustomizeSetting = () => {
    setEmailSetting({
      hostname: "",
      username: "",
      password: "",
      port: "",
    });
    setDisabled(false);
  };

  return (
    <>
      {disabled || authService.getIsStarter() ? (
        <>
          <Alert
            severity="info"
            style={{
              marginTop: "50px",
            }}
            action={
              <Button
                disabled={authService.getIsStarter()}
                variant="outlined"
                onClick={() => {
                  changeCustomizeSetting();
                }}
              >
                {getTranslation(
                  "Use Custom Settings",
                  "Utiliser les paramètres personnalisés",
                  "Benutzerdefinierte Einstellungen verwenden"
                )}
              </Button>
            }
          >
            {getTranslation(
              "System is using default settings if you want to use custom setting please click button on right side.",
              "Le système utilise les paramètres par défaut si vous souhaitez utiliser les paramètres personnalisés, veuillez cliquer sur le bouton sur le côté droit",
              "Das System verwendet Standardeinstellungen, wenn Sie benutzerdefinierte Einstellungen verwenden möchten, klicken Sie bitte auf die Schaltfläche auf der rechten Seite"
            )}
          </Alert>
          {authService.getIsStarter() == true ? <UpgradeSMTP /> : null}
        </>
      ) : (
        <FormLoader progress={emailSettingLoading}>
          <Formik
            enableReinitialize
            initialValues={defualtSettingValues}
            validationSchema={basicEmailSettingValidationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              onEmailSettingSubmit(values, actions);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              getFieldProps,
            }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      id="hostname"
                      label={getTranslation(
                        "Hostname",
                        "Nom d'h�bergement",
                        "Hosting Name"
                      )}
                      size="small"
                      variant="outlined"
                      name="hostname"
                      // disabled={disabled}
                      // type={disabled == false ? "text" : "password"}

                      {...getFieldProps("hostname")}
                      error={touched.hostname && Boolean(errors.hostname)}
                      helperText={touched.hostname && errors.hostname}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      id="username"
                      label={getTranslation(
                        "Username",
                        "Nom d'utilisateur",
                        "Benutzername"
                      )}
                      size="small"
                      variant="outlined"
                      // type={disabled == false ? "text" : "password"}
                      name="username"
                      // disabled={disabled}
                      {...getFieldProps("username")}
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      id="password"
                      label={getTranslation(
                        "Password",
                        "Mot de passe",
                        "Kennwort"
                      )}
                      size="small"
                      variant="outlined"
                      // type={disabled == false ? "text" : "password"}
                      name="password"
                      // disabled={disabled}
                      {...getFieldProps("password")}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      id="port"
                      label={getTranslation(
                        "Port ( SSL/TLS Port only )",
                        "Port (port SSL/TLS uniquement)",
                        "Port (nur SSL/TLS-Port)"
                      )}
                      size="small"
                      variant="outlined"
                      name="port"
                      // type={disabled == false ? "text" : "password"}
                      // disabled={disabled}
                      {...getFieldProps("port")}
                      error={touched.port && Boolean(errors.port)}
                      helperText={touched.port && errors.port}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
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
                      "Default Setting",
                      "Param�tres par d�faut",
                      "Voreinstellung"
                    )}
                    size="large"
                    style={{ marginRight: "10px" }}
                    variant="contained"
                    color="primary"
                    loading={submitLoading}
                    onClick={onSubmitDefaultSettings}
                  />
                  <ButtonWithLoading
                    title={getTranslation("Save", "sauvegarder", "Speichern")}
                    size="large"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </FormLoader>
      )}
    </>
  );
};
