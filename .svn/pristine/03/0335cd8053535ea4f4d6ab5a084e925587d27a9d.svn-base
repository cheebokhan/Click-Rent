import {
  Grid,
  TextField,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import * as Yup from "yup";
import { UploadFiles } from "../../../components/Upload";
import DialogComponent from "../../../components/Dialog";
import { getTranslation } from "../../../heplers/translationHelper";
import MaskedInput from "react-text-mask";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
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
    />
  );
}

const AddTanentDialog = ({ onSubmit, isOpen, onClose }) => {
  const selectDate = [
    {
      id: 0,
      day: getTranslation("None","None","None"),
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
    reminderType: "",
    rentDueDay: 0,
    enableAutoReminder: true,
    sendReminderBy: 2,
    files: [],
    startContract: false,
  };

  const basicValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Minimum 3 characters is required")
      .max(20, "Maximum 20 characters")
      .required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    telephone: Yup.string().required("Phone number is required"),
    idCard: Yup.string().required("Field is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    // apartmentId: Yup.number().min(1),
    // buildingId: Yup.number().min(1),
  });

  const defaultValue = initialValues;
  return (
    <>
      <DialogComponent
        title={getTranslation(
          "Add Tenant",
          "Ajouter un locataire",
          "Mieter hinzuf�gen"
        )}
        open={isOpen}
        onClose={onClose}
        
      >
        <Box p={2} width="500px">
          <Formik
            enableReinitialize
            initialValues={defaultValue}
            validationSchema={basicValidationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
            values.telephone = values.telephone.replace(/\s/g, "");
              onSubmit(values, actions);
              actions.setSubmitting(false);
              actions.resetForm();
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
                  <Grid item xs={6} lg={6} md={6} sm={6}>
                    <TextField
                      fullWidth
                      id="firstName"
                      label={getTranslation(" First Name", "Pr�nom", "Vorname")}
                      required
                      size="small"
                      variant="outlined"
                      type="text"
                      name="firstName"
                      {...getFieldProps("firstName")}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} lg={6} md={6} sm={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      label={getTranslation(" Last Name", "Nom", "Nachname")}
                      required
                      size="small"
                      variant="outlined"
                      name="lastName"
                      type="text"
                      {...getFieldProps("lastName")}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} lg={6} md={6} sm={6}>
                    <TextField
                      fullWidth
                      id="idCard"
                      label={getTranslation(
                        "ID Card",
                        "Carte d'identit�",
                        "Personalausweis"
                      )}
                      size="small"
                      variant="outlined"
                      required
                      name="idCard"
                      {...getFieldProps("idCard")}
                      error={touched.idCard && Boolean(errors.idCard)}
                      helperText={touched.idCard && errors.idCard}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} lg={6} md={6} sm={6}>
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
                      required
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
                  <Grid item xs={6} lg={6} md={6} sm={6}>
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
                  <Grid item xs={6} lg={6} md={6} sm={6}>
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
                        <MenuItem value={0}>{getTranslation("SMS","SMS","SMS")}</MenuItem>
                        <MenuItem value={1}>{getTranslation("Email","Email","Email")}</MenuItem>
                        <MenuItem value={2}>{getTranslation("SMS and Email","SMS and Email","SMS and Email")}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      // disabled={values.enableAutoReminder}
                    >
                      <InputLabel id="demo-simple-select-label">
                      {getTranslation(
                          "Rent Due Date",
                          "Date d'�ch�ance",
                          "Zahltag"
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
                  <Grid item xs={6} sm={6} md={6} lg={6}>
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
                  <Grid item xs={6} sm={6} md={6} lg={6}>
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
                      onClick={()=>{}}
                    />
                    <Typography variant="h5" style={{marginLeft:"15%"}}>
                      {getTranslation(
                        "ID-Front Side",
                        "Carte ID recto",
                        "Pass Vorderseite"
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
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
                    />
                    <Typography variant="h5" style={{marginLeft:"15%"}}>
                      {getTranslation(
                        "ID-Back Side",
                        "Carte ID verso",
                        "Pass R�ckseite"
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Box
                  pt={4}
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ButtonWithLoading
                    title={getTranslation("Add", "Ajouter", "Addieren")}
                    size="small"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  />
                  &nbsp; &nbsp;
                  <ButtonWithLoading
                    title={getTranslation(
                      "Start Contract",
                      "D�but du contrat",
                      "Vertrag starten"
                    )}
                    size="small"
                    variant="contained"
                    color="primary"
                    //loading={isSubmitting}
                    onClick={(e) => {
                      setFieldValue("startContract", true);
                      handleSubmit(e);
                    }}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </DialogComponent>
    </>
  );
};

export default AddTanentDialog;
