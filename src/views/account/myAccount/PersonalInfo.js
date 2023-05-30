import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import {
  CardContent,
  CardActions,
  Grid,
  TextField,
  Box,
  CardHeader,
} from "@material-ui/core";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import Card from "../../../components/Card";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import { Autocomplete } from "@material-ui/lab";
import { useSnackbar } from "notistack";

import { Post, Get, updateUserInfo, getUserData } from "../../../actions";
import {
  GET_USER_PROFILE_URL,
  Post_UpdateUSER_PROFILE_URL,
} from "../../../constants/apiUrls";
import { useSelector } from "react-redux";
import { getTranslation } from "../../../heplers/translationHelper";
const PersonalInfo = () => {
  // const [personalInfo, setPersonalInfo] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   setLoading(true);
  //   getUserData(
  //     (resp) => {
  //       console.log("jhdskjsdg",resp);
  //       setPersonalInfo(resp.data);
  //       setLoading(false);
  //     },
  //     (error) => {
  //       setLoading(false);
  //     }
  //   );
  // }, []);

  const onSubmit = (values, actions) => {
    updateUserInfo(
      values,
      (resp) => {
        enqueueSnackbar(getTranslation("Profile updated successfully"), {
          variant: "success",
        });
        actions.setSubmitting(false);
      },
      (error) => {
        enqueueSnackbar(getTranslation("Internal server error"), {
          variant: "error",
        });
        actions.setSubmitting(false);
      }
    );
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
  };

  const basicValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(
      getTranslation(
        " First name is required ",
        " Le pronom est requis ",
        " Vorname ist erforderlich "
      )
    ),
    lastName: Yup.string().required(
      getTranslation(
        " Last name is required ",
        " Le nom de famille est requis ",
        " Nachname ist erforderlich "
      )
    ),
    email: Yup.string().email().required("Email is required"),
  });
  const defaultValue = loading ? initialValues : user;
  return (
    <Card>
      <CardHeader
        title={getTranslation(
          "Update Personal Information",
          "Mettre  jour les informations personnelles",
          "Personliche Daten aktualisieren"
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
          <Form>
            {console.log("kldhfsdjhg", values, errors)}
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={getTranslation("First Name", "Pr�nom", "Vorname")}
                    size="small"
                    variant="outlined"
                    name="firstName"
                    {...getFieldProps("firstName")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={getTranslation("Last Name", "Nom", "Nachname")}
                    size="small"
                    variant="outlined"
                    name="lastName"
                    {...getFieldProps("lastName")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={getTranslation("Email", "Email", "Email")}
                    size="small"
                    variant="outlined"
                    name="email"
                    {...getFieldProps("email")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={getTranslation(
                      "Username",
                      "Nom d'utilisateur",
                      "Benutzername"
                    )}
                    size="small"
                    variant="outlined"
                    name="userName"
                    disabled
                    {...getFieldProps("userName")}
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
                  title={getTranslation("Update", "Mise � jour", "Speichern")}
                  size="small"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                />
              </Box>
            </CardActions>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default PersonalInfo;
