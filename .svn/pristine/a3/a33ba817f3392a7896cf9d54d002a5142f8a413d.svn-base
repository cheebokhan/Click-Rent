import React from "react";
import {
  Container,
  CssBaseline,
  Button,
  Typography,
  TextField,
  Box,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import useStyles from "../../assests/styles/views/auth/login";
import Copyright from "../../utils/copyRightUtils";
import { TransparentLogo } from "../../components/Logo";
import ButtonWithLoading from "../../components/ButtonWithLoading";
import { getTranslation } from "../../heplers/translationHelper";

const ForgetPassword = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.logo}>
          <TransparentLogo />
        </div>
        <Typography component="h1" variant="h2" color="secondary">
          {getTranslation(
            "Forget Password",
            "Mot de passe oublié",
            "Passwort vergessen"
          )}
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required(
                getTranslation(
                  " Email is required ",
                  " L'e-mail est requis ",
                  " E-Mail ist erforderlich "
                )
              )
              .email(
                getTranslation(
                  " Please enter a valid Email ",
                  " Veuillez saisir un e-mail valide ",
                  " Bitte geben Sie eine gültige Email-Adresse ein "
                )
              ),
            password: Yup.string().required(
              getTranslation(
                " Password is required ",
                " Mot de passe requis ",
                " Passwort wird benötigt "
              )
            ),
          })}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className={classes.form} noValidate>
              <Box mt={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={getTranslation(
                    "Email Address",
                    "Adresse e-mail",
                    "E-Mail-Addresse"
                  )}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>

              <ButtonWithLoading
                type="submit"
                title={getTranslation(
                  "Submit",
                  "Nous faire parvenir",
                  "einreichen"
                )}
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                className={classes.submit}
                loading={isSubmitting}
              />

              <Grid container>
                <Grid item xs>
                  <Link to="/login" color="secondary" variant="body1">
                    <Box display="flex" alignItems="center" mt={2}>
                      <KeyboardBackspaceIcon color="disabled" />
                      &nbsp;
                      <Typography color="textSecondary">
                        {getTranslation(
                          "Back To Login",
                          "Retour connexion",
                          "Zurück zur Anmeldung"
                        )}
                      </Typography>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ForgetPassword;
