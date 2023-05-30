import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  TextField,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import ButtonWithLoading from "../../../../../components/ButtonWithLoading";
import * as Yup from "yup";
import { PrintButton } from "../../../../../components/ButttonsWithIcons";
import { UploadFiles } from "../../../../../components/Upload";
import { useParams } from "react-router";
import { Get } from "../../../../../actions";
import { Get_Tanenet_URL } from "../../../../../constants/apiUrls";
import { getTranslation } from "../../../../../heplers/translationHelper";
import { PreviewImageDialog } from "../../previewImageDialog";
import 'react-phone-number-input/style.css'
import './style.css'

import PhoneInput from "react-phone-number-input";
import MaskedInput from "react-text-mask";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;


  return (
    <>
    {/* <Select>
      <MenuItem>Belgium</MenuItem>
      <MenuItem>France</MenuItem>
      <MenuItem>Germany</MenuItem>

    </Select> */}
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "+",
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
        " ",
        /\d/,
        /\d/,
      ]}
      showMask
    /></>
  );
}


const AddDetails = ({ onSubmit, printDetails }) => {

  const sendReminderType = [
    {
      id: 0,
      label: getTranslation("SMS", "SMS", "SMS"),
    },
    {
      id: 1,
      label: getTranslation("Email", "E-mail", "Email"),
    },
    {
      id: 2,
      label: getTranslation("Email And SMS", "E-mail et SMS", "Email und SMS"),
    },
  ];
  const selectDate = [
    {
      id: 0,
      day: "None",
    },
    {
      id: 1,
      day: "1st",
    },
    {
      id: 2,
      day: "2nd",
    },
    {
      id: 3,
      day: "3rd",
    },
    {
      id: 4,
      day: "4th",
    },
    {
      id: 5,
      day: "5th",
    },
    {
      id: 6,
      day: "6th",
    },
    {
      id: 7,
      day: "7th",
    },
    {
      id: 8,
      day: "8th",
    },
    {
      id: 9,
      day: "9th",
    },
    {
      id: 10,
      day: "10th",
    },
    {
      id: 11,
      day: "11th",
    },
    {
      id: 12,
      day: "12th",
    },
    {
      id: 13,
      day: "13th",
    },
    {
      id: 14,
      day: "14th",
    },
    {
      id: 15,
      day: "15th",
    },
    {
      id: 16,
      day: "16th",
    },
    {
      id: 17,
      day: "17th",
    },
    {
      id: 18,
      day: "18th",
    },
    {
      id: 19,
      day: "19th",
    },
    {
      id: 20,
      day: "20th",
    },
    {
      id: 21,
      day: "21st",
    },
    {
      id: 22,
      day: "22nd",
    },
    {
      id: 23,
      day: "23rd",
    },
    {
      id: 24,
      day: "24th",
    },
    {
      id: 25,
      day: "25th",
    },
    {
      id: 26,
      day: "26th",
    },
    {
      id: 27,
      day: "27th",
    },
    {
      id: 28,
      day: "28th",
    },
    {
      id: 29,
      day: "29th",
    },
    {
      id: 30,
      day: "30th",
    },
    {
      id: 31,
      day: "31st",
    },
  ];
  const history = useHistory();

  const { tenantId } = useParams();
  const [tenant, setTenant] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewImageAddress, setPreviewImageAddress] = useState("");
  useEffect(() => {
    Get(
      { tenantId: tenantId },
      Get_Tanenet_URL,
      null,
      (resp) => {
        console.log("jhgsfhsdfsdf", resp.data);
        setTenant(resp.data);
      },
      (error) => {}
    );
  }, [tenantId]);
  const rentDueOptions = () => {
    return selectDate.map((item) => {
      return <MenuItem value={item.id}>{item.day}</MenuItem>;
    });
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    idCard: "",
    telephone: "",
    email: "",
    isActive: false,
    apartmentId: 0,
    reminderType: "",
    rentDueDay: 0,
    enableAutoReminder: false,
    sendReminderBy: 0,
    files: [],
    buildingId: 0,
    apartment: {},
    building: {},
  };

  const basicValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    telephone: Yup.string().required("Phone number is required"),
  });
  // useEffect(() => {
  //   if (tenant) onBuildingChange(tenant?.building?.id);
  // }, [tenant]);
  // const selectedReminderType = (type) =>
  //   sendReminderType.find((x) => x.id == type);

  const defaultValue = tenant ? tenant : initialValues;
  return (<>
    <Card>
      <CardHeader
        title={getTranslation(
          "Update Tenant",
          "Mettre � jour le locataire",
          "Mieter aktualisieren"
        )}
      />
      <Typography align="center" variant="h4">
        {getTranslation(
          "Reference Code",
          "R�f�rence paiement",
          "Referenz Mieter"
        )}
        : {tenant?.referenceCode}
      </Typography>
      <br/>
      <Typography align="center" variant="h4" >
        {getTranslation(
          "Account Balance",
          "Account Balance",
          "Account Balance"
        )}
        : <strong style={{color:tenant?.accountBalance <0 ?'red':''}}>{tenant?.accountBalance.toFixed(2)}</strong>
      </Typography>
      <br />
      <CardContent>
        <Formik
        enableReinitialize
          initialValues={defaultValue}
          validationSchema={basicValidationSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            values.telephone = values.telephone.replace(/\s/g, "");
            history.push("/dashboard")


            onSubmit(values, actions);
          }}
        >
          {({
            errors,
            touched,
            values,
            handleSubmit,
            isSubmitting,
            getFieldProps,
            setFieldValue,
          }) => (
            <Form>

              <Grid container spacing={2}>
                <Grid item xs={12} lg={3} md={3} sm={12}>
                  <TextField
                    fullWidth
                    id="firstName"
                    value={values?.firstName}
                    label={getTranslation(" First Name", "Pr�nom", "Vorname")}
                    required
                    size="small"
                    variant="outlined"
                    name="firstName"
                    {...getFieldProps("firstName")}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={12}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label={getTranslation(" Last Name", "Nom", "Nachname")}
                    required
                    size="small"
                    variant="outlined"
                    name="lastName"
                    {...getFieldProps("lastName")}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={12}>
                  <TextField
                    fullWidth
                    id="idCard"
                    label={getTranslation(
                      "ID Card",
                      "Carte d'identit�",
                      "Personalausweis"
                    )}
                    required
                    size="small"
                    variant="outlined"
                    name="idCard"
                    {...getFieldProps("idCard")}
                    error={touched.idCard && Boolean(errors.idCard)}
                    helperText={touched.idCard && errors.idCard}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={12}>
                  <TextField
                    fullWidth
                    id="telephone"
                    label={getTranslation("Phone", "T�l�phone", "Telefon")}
                    size="small"
                    variant="outlined"
                    name="telephone"
                    {...getFieldProps("telephone")}
                    error={touched.telephone && Boolean(errors.telephone)}
                    helperText={touched.telephone && errors.telephone}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: TextMaskCustom,
                    }}
                  />
                  {/* <TextField
                    fullWidth
                    id="telephone"
                    label={getTranslation("Phone", "T�l�phone", "Telefon")}
                    required
                    size="small"
                    variant="outlined"
                    name="telephone"
                    {...getFieldProps("telephone")}
                    error={touched.telephone && Boolean(errors.telephone)}
                    helperText={touched.telephone && errors.telephone}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */}
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label={getTranslation("Email", "Email", "Email")}
                    required
                    size="small"
                    variant="outlined"
                    name="email"
                    {...getFieldProps("email")}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="demo-simple-select-label">
                    {getTranslation(
                        "Send Reminder By",
                        "Send Reminder By",
                        "Send Reminder By"
                      )}
                    </InputLabel>
                    <Select
                      style={{
                        height: "40px",
                      }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.sendReminderBy}
                      label={getTranslation(
                        "Send Reminder By",
                        "Envoi de rappels par",
                        "Erinnerungen versenden per"
                      )}
                      onChange={(e, reminderType) => {
                        setFieldValue("sendReminderBy", e.target.value);
                      }}
                    >
                      <MenuItem value={0}>Email</MenuItem>
                      <MenuItem value={1}>SMS</MenuItem>
                      <MenuItem value={2}>SMS and Email</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel id="demo-simple-select-label">
                    {getTranslation(
                        "Rent Due Date",
                        "Rent Due Date",
                        "Rent Due Date"
                      )}
                    </InputLabel>
                    <Select
                      style={{
                        height: "40px",
                      }}
                      autoComplete="true"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.rentDueDay}
                      label={getTranslation(
                        "Rent Due Date",
                        "Date d'�ch�ance",
                        "Zahltag"
                      )}
                      onChange={(e, reminderType) => {
                        setFieldValue("rentDueDay", e.target.value);
                      }}
                    >
                      {rentDueOptions()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Typography style={{ fontSize: "14px", marginTop: "11px" }}>
                    {getTranslation(
                      "of each month",
                      "de chaque mois",
                      "monatlich"
                    )}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <FormControl>
                    <FormControlLabel
                      label={getTranslation(
                        "Enable Auto Reminder",
                        "Activer les rappels automatiques",
                        "Automatische Erinnernugen aktivieren"
                      )}
                      labelPlacement="start"
                      control={
                        <Checkbox
                          id="enableAutoReminder"
                          checked={values.enableAutoReminder}
                          onChange={(e, check) => {
                            setFieldValue("enableAutoReminder", check);
                          }}
                        />
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant="h4">
                    {getTranslation(
                      "Upload Images",
                      "T�l�chargez documents",
                      "Dokument hochladen"
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <UploadFiles
                    uploadedFiles={
                      values.frontIdCardSide ? [values.frontIdCardSide] : []
                    }
                    onAddFile={(file) => {
                      setFieldValue("frontIdCardSide", file);
                    }}
                    getFileName={(file) => file}
                    onDeleteFile={() => {}}
                    multiple={false}
                    onClick={(address) => {
                      setPreviewImage(true)
                      setPreviewImageAddress(address)
                    }}
                  />
                  <Typography variant="h5" style={{ marginLeft: "40px" }}>
                    {getTranslation(
                      "ID-Front Side",
                      "Carte ID recto",
                      "Pass Vorderseite"
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <UploadFiles
                    uploadedFiles={
                      values.backIdCardSide ? [values.backIdCardSide] : []
                    }
                    onAddFile={(file) => {
                      setFieldValue("backIdCardSide", file);
                    }}
                    getFileName={(file) => file}
                    onDeleteFile={(file) => {}}
                    multiple={false}
                    onClick={(address) => {
                      setPreviewImage(true)
                      setPreviewImageAddress(address)
                    }}
                  />
                  <Typography variant="h5" style={{ marginLeft: "40px" }}>
                    {getTranslation(
                      "ID-Back Side",
                      "Carte ID verso",
                      "Pass R�ckseite"
                    )}
                  </Typography>
                </Grid>
              </Grid>
              <Box
                pr={1}
                pb={1}
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <PrintButton
                  size="small"
                  variant="contained"
                  color="primary"
                  //loading={isSubmitting}
                  onClick={printDetails}
                >
                   {getTranslation(
                      "Print",
                      "Print",
                      "Print"
                    )}
                </PrintButton>

                <ButtonWithLoading
                  style={{ marginLeft: "10px" }}
                  title= {getTranslation(
                    "Update",
                    "Update",
                    "Update"
                  )}
                  size="small"
                  variant="contained"
                  color="primary"
                  margin="20px"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
    <PreviewImageDialog
      title="Preview"
      open={previewImage}
      fileAddress={previewImageAddress}
      onClose={() => {
        setPreviewImage(false)
        setPreviewImageAddress("")
      }} />
    </>);
};

export default AddDetails;
