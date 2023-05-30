import { Box, Card, CardContent, Grid, TextField } from "@material-ui/core";
import ButtonWithLoading from "../../../../../components/ButtonWithLoading";
import { DatePicker } from "../../../../../components/DatePicker";
import DialogComponent from "../../../../../components/Dialog";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useParams } from "react-router";
import { getTranslation } from "../../../../../heplers/translationHelper";
export const UpdateContractDialog = ({
  isOpen,
  contractId,
  currentAmount,
  onClose,
  onSubmit,
}) => {
  const initialValues = {
    id: contractId,
    newRent: currentAmount,
  };

  const basicValidationSchema = Yup.object().shape({
    id: Yup.number().required("required"),
    newRent: Yup.number().required("required"),
  });

  const defaultValue = initialValues;
  return (
    <DialogComponent
      fullWidth
      title="Update Contract Rent"
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
                  <Grid xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      fullWidth
                      id="newRent"
                      label={getTranslation("Rent", "Loyer", "Miete")}
                      required
                      size="small"
                      variant="outlined"
                      type="number"
                      name="newRent"
                      {...getFieldProps("newRent")}
                      error={touched.newRent && Boolean(errors.newRent)}
                      helperText={touched.newRent && errors.newRent}
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
                      style={{ marginTop: "1em" }}
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

export default UpdateContractDialog;
