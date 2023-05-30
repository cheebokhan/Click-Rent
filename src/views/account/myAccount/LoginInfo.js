import React from "react";
import { Formik } from "formik";
import {
  CardContent,
  CardActions,
  Grid,
  TextField,
  Box,
  CardHeader,
} from "@material-ui/core";
import Card from "../../../components/Card";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Post, Get, updateUserPassword } from "../../../actions";
import { Post_UpdateUserPassword_URL } from "../../../constants/apiUrls";
import { getTranslation } from "../../../heplers/translationHelper";
const LoginInfo = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  };

  const basicValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(
      getTranslation(
        " Current Password is required ",
        " Le mot de passe actuel est requis ",
        " Aktuelles Passwort ist erforderlich "
      )
    ),
    newPassword: Yup.string()
      .min(6)
      .max(50)
      .required(
        getTranslation(
          " New Password is required ",
          " Un nouveau mot de passe est requis ",
          " Neues Passwort ist erforderlich "
        )
      ),
    newConfirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        getTranslation(
          " Password does not match ",
          " Le mot de passe ne correspond pas ",
          " Passwort stimmt nicht überein "
        )
      )
      .required(
        getTranslation(
          " Confirm Password is required ",
          " Confirmer le mot de passe est requis ",
          " Passwort bestätigen ist erforderlich "
        )
      ),
  });
  const defaultValue = initialValues;

  const onSubmit = (values, actions) => {
    updateUserPassword(
      values,
      (resp) => {
        enqueueSnackbar(
          getTranslation(
            " Password updated ",
            " Mot de passe mis à jour ",
            " Passwort aktualisiert "
          ),
          { variant: "success" }
        );
        actions.setSubmitting(false);
      },
      (error) => {
        enqueueSnackbar(
          getTranslation(
            " Something went wrong ",
            " Quelque chose s'est mal passé ",
            " Etwas ist schief gelaufen "
          ),
          { variant: "error" }
        );
        actions.setSubmitting(false);
      }
    );
  };

  return (
    <Card>
      <CardHeader
        title={getTranslation(
          "Change Password",
          "Changer le mot de passe",
          "Passwort ändern"
        )}
      />
      <Formik
        enableReinitialize
        initialValues={defaultValue}
        validationSchema={basicValidationSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          onSubmit(values, actions);
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
          <form>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    fullWidth
                    label={getTranslation(
                      "Current Password",
                      "Mot de passe actuel",
                      "Aktuelles Passwort"
                    )}
                    required
                    size="small"
                    variant="outlined"
                    name="currentPassword"
                    type="password"
                    {...getFieldProps("currentPassword")}
                    error={
                      touched.currentPassword && Boolean(errors.currentPassword)
                    }
                    helperText={
                      touched.currentPassword && errors.currentPassword
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    fullWidth
                    label={getTranslation(
                      "New Password",
                      "nouveau mot de passe",
                      "Neues Kennwort"
                    )}
                    required
                    size="small"
                    variant="outlined"
                    name="newpassword"
                    type="Password"
                    {...getFieldProps("newPassword")}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    fullWidth
                    label={getTranslation(
                      "Confirm Password",
                      "Confirmez le mot de passe",
                      "Bestätige das Passwort"
                    )}
                    required
                    size="small"
                    variant="outlined"
                    name="newConfirmPassword"
                    type="password"
                    {...getFieldProps("newConfirmPassword")}
                    error={
                      touched.newConfirmPassword &&
                      Boolean(errors.newConfirmPassword)
                    }
                    helperText={
                      touched.newConfirmPassword && errors.newConfirmPassword
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Box
                pr={1}
                pb={1}
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <ButtonWithLoading
                  title={getTranslation("Update", "Mise à jour", "Speichern")}
                  size="small"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                />
              </Box>
            </CardActions>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default LoginInfo;
