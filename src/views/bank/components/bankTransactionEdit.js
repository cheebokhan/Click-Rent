import { Box, Card, CardContent, Grid, TextField } from "@material-ui/core";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import { DatePicker } from "../../../components/DatePicker";
import DialogComponent from "../../../components/Dialog";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useParams } from "react-router";
import { getTranslation } from "../../../heplers/translationHelper";
export const BankTransactionEdit = ({ isOpen, onClose, onSubmit }) => {
  const initialValues = {
    counterpartReference: " ",
    matchCounterReference: " ",
    tenantName: " ",
  };

  const basicValidationSchema = Yup.object().shape({
    counterpartReference: Yup.string().required("Counterpart Number is Required"),
    matchCounterReference: Yup.string().required(
      "Matched Counterpart Number is Required"
    ),
    tenantName: Yup.string().required("Tenant Name is required"),
  });

  const defaultValue = initialValues;
  return (
    <DialogComponent
      fullWidth
      title="Bank Transaction Update"
      open={isOpen}
      onClose={onClose}
    >
      <Card>
        <CardContent>
          <Formik
            initialValues={defaultValue}
            validationSchema={basicValidationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
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
                  <Grid item xs={6} lg={6} md={6} sm={6}>
                    <TextField
                      fullWidth
                      id="counterpartReference"
                      label={getTranslation(
                        "CounterPart Number",
                        "Numéro de pièce de contrepartie",
                        "Gegenstücknummer"
                      )}
                      required
                      size="small"
                      variant="outlined"
                      type="text"
                      name="counterpartReference"
                      {...getFieldProps("counterpartReference")}
                      error={
                        touched.counterpartReference &&
                        Boolean(errors.counterpartReference)
                      }
                      helperText={
                        touched.counterpartReference &&
                        errors.counterpartReference
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={6} lg={6} md={6} sm={6}>
                    <TextField
                      fullWidth
                      id="matchCounterReference"
                      label={getTranslation(
                        "Matched CounterPart Number",
                        "Numéro de contrepartie correspondant",
                        "Abgestimmte Gegenstücknummer"
                      )}
                      required
                      size="small"
                      variant="outlined"
                      type="text"
                      name="matchCounterReference"
                      {...getFieldProps("matchCounterReference")}
                      error={
                        touched.matchCounterReference &&
                        Boolean(errors.matchCounterReference)
                      }
                      helperText={
                        touched.matchCounterReference &&
                        errors.matchCounterReference
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} lg={6} md={6} sm={6}>
                    <TextField
                      fullWidth
                      id="tenantName"
                      label={getTranslation(
                        "Tenant Name",
                        "Nom du locataire",
                        "Mietername"
                      )}
                      required
                      size="small"
                      variant="outlined"
                      type="text"
                      name="tenantName"
                      {...getFieldProps("tenantName")}
                      error={touched.tenantName && Boolean(errors.tenantName)}
                      helperText={touched.tenantName && errors.tenantName}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <ButtonWithLoading
                      title="Update"
                      color="primary"
                      variant="contained"
                      size="small"
                      loading={isSubmitting}
                      onClick={handleSubmit}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </DialogComponent>
  );
};

export default BankTransactionEdit;
