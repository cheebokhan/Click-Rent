import React from "react";
import { useParams } from "react-router-dom";
import {
    Grid,
    TextField,
    Box,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import ButtonWithLoading from "../../../../../components/ButtonWithLoading";
import * as Yup from "yup";
import Dialog from "../../../../../components/Dialog";
import { getTranslation } from "../../../../../heplers/translationHelper";

const AddAppartmentDialog = ({isOpen,apartment,enableEdit,onSubmit,onClose}) => {
  console.log("mdsfdslkjsldgsfdg",apartment);
    const { buildingId } = useParams();
    const initialValues = {
      id:apartment?.id,
      apartmentNo: "",
      amount: "",
      buildingId: buildingId,
    };
    const basicValidationSchema = Yup.object().shape({
        apartmentNo: Yup.string().required(),
        amount: Yup.number().min(1).required()
    });

    const defaultValue = apartment ? apartment : initialValues;
    return (
      <Dialog open = {isOpen} title={ apartment? getTranslation("Edit Apartment","Edit Apartment","Edit Apartment") : getTranslation("Add Apartment","Add Apartment","Add Apartment")} onClose = {onClose} fullWidth>
      <Formik
        enableReinitialize
        initialValues={defaultValue}
        validationSchema={basicValidationSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          onSubmit(values, actions);
          actions.resetForm(initialValues);
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
            <Grid container spacing={2} style={{margin:"1%"}}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="apartmentNo"
                  label={getTranslation("Appartment No","Appartment No","Appartment No")}
                  required
                  size="small"
                  variant="outlined"
                  name="apartmentNo"
                  {...getFieldProps("apartmentNo")}
                  error={touched.apartmentNo && Boolean(errors.apartmentNo)}
                  helperText={touched.apartmentNo && errors.apartmentNo}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="amount"
                  label={getTranslation("Rent","Rent","Rent")}
                  required
                  size="small"
                  variant="outlined"
                  type={"number"}
                  name="amount"
                  {...getFieldProps("amount")}
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Box
              pr={1}
              pb={1}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ButtonWithLoading
                title={enableEdit ? getTranslation("Update","Update","Update") : getTranslation("Add","Add","Add")}
                size="small"
                variant="contained"
                color="primary"
                type="submit"
                loading={isSubmitting}
                onClick={handleSubmit}
              />
            </Box>
          </Form>
        )}
      </Formik>
      </Dialog>
    );

}

export default AddAppartmentDialog;
