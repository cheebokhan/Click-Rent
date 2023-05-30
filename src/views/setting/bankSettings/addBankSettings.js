import React, { useEffect } from "react";
import {
  CardContent,
  CardActions,
  Grid,
  TextField,
  Box,
  Card,
  CardHeader,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import * as Yup from "yup";

import { useSnackbar } from "notistack";

import { Get, Post } from "../../../actions";
import {
  Post_UpdateBank_URL,
  Post_UpsertSystemSetting_URL,
} from "../../../constants/apiUrls";
import { useDispatch } from "react-redux";
import { DatePicker } from "../../../components/DatePicker";
import MaskedInput from "react-text-mask";
import { getTranslation } from "../../../heplers/translationHelper";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[a-zA-Z]/,
        /[a-zA-Z]/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      showMask={false}
      guide={false}

    />
  );
}
export const BankSettings = ({ updateBank,refresh }) => {
  console.log("dhgkjfbsdg", updateBank);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  //const [systemSetting, setSystemSetting] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "Clear_All_BreadCrumb" });
    dispatch({
      type: "Add_BreadCrumb",
      payload: { title: "Settings", url: "/settings/bank" },
    });
  }, []);

  const onSystemSettingSubmit = async (values, actions) => {
    Post(
      values,
      updateBank ? Post_UpdateBank_URL : Post_UpsertSystemSetting_URL,
      history,
      (resp) => {
        actions.setSubmitting(false);
        if (updateBank)
          enqueueSnackbar(getTranslation("We had updated your ponto settings.", "We had updated your ponto settings.", "We had updated your ponto settings."), { variant: "success" });
        else
          enqueueSnackbar(getTranslation("We were able to communicate with ponto. It will take some time to load all of your data from ponto.", "We were able to communicate with ponto. It will take some time to load all of your data from ponto.", "We were able to communicate with ponto. It will take some time to load all of your data from ponto."), { variant: "success" });
        if (refresh)
          refresh();
          actions.resetForm()
      },
      (onError) => {
        actions.setSubmitting(false);
        enqueueSnackbar("Account information is invalid", {
          variant: "error",
        });
      }
    );
  };

  const initialValues = {
    publicKey: "",
    securityKey: "",
    iban: "",
    importFrom: new Date(),
    shortDescription: " ",
  };

  const basicSystemSettingValidationSchema = Yup.object().shape({
    publicKey: Yup.string().required("Ponto public key is required"),
    securityKey: Yup.string().required("Ponto secret key is required"),
    iban: Yup.string().required("IBAN is required"),
    shortDescription: Yup.string().required("Write some Description"),
  });
  const defaultValue = updateBank ? updateBank : initialValues;
  return (
    <>
      <Card>
        <CardHeader
          title={getTranslation(
            "Bank Settings",
            "Paramètres bancaires",
            "Bankeinstellungen"
          )}
        />
        <Formik
          enableReinitialize
          initialValues={defaultValue}
          validationSchema={basicSystemSettingValidationSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            values.iban = values.iban.replace(/\s/g, "");
            onSystemSettingSubmit(values, actions);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            getFieldProps,
          }) => (
            <Form>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      id="iban"
                      label="IBAN"
                      size="small"
                      variant="outlined"
                      name="iban"
                      {...getFieldProps("iban")}
                      error={touched.iban && Boolean(errors.iban)}
                      helperText={touched.iban && errors.iban}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent: TextMaskCustom,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      id="securityKey"
                      label={getTranslation(
                        "Security Key",
                        "Clef de sécurité",
                        "Sicherheitsschlüssel"
                      )}
                      size="small"
                      variant="outlined"
                      name="securityKey"
                      {...getFieldProps("securityKey")}
                      error={touched.securityKey && Boolean(errors.securityKey)}
                      helperText={touched.securityKey && errors.securityKey}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                      fullWidth
                      id="publicKey"
                      label={getTranslation(
                        "Public Key",
                        "Clé publique",
                        "Öffentlicher Schlüssel"
                      )}
                      size="small"
                      variant="outlined"
                      name="publicKey"
                      {...getFieldProps("publicKey")}
                      error={touched.publicKey && Boolean(errors.publicKey)}
                      helperText={touched.publicKey && errors.publicKey}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <DatePicker
                      label={getTranslation("Import From", "Importer de", "Importieren von")}
                      value={values.importFrom}
                      required
                      onChange={(newDate) => {
                        setFieldValue("importFrom", newDate);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      id="shortDescription"
                      label={
                        getTranslation("Short Description",
                        "brève description",
                        "kurze Beschreibung")
                      }
                      multiline
                      size="large"
                      variant="outlined"
                      name="shortDescription"
                      {...getFieldProps("shortDescription")}
                      error={
                        touched.shortDescription &&
                        Boolean(errors.shortDescription)
                      }
                      helperText={
                        touched.shortDescription && errors.shortDescription
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
                  justifyContent="center"
                >
                  <ButtonWithLoading
                    title={
                      updateBank
                        ? getTranslation("Update", "Mise jour", "Speichern")
                        : getTranslation("Add", "Ajouter", "Addieren")
                    }
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
      <br />
    </>
  );
};
