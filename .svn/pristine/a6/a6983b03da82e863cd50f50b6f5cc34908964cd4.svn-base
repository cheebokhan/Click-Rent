import React, { useState, useEffect } from "react";
import {
  CardContent,
  CardActions,
  Grid,
  TextField,
  Box,
  Typography,
  CardHeader,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import Card from "../../../components/Card";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import * as Yup from "yup";
import Switch from "../../../components/Switch";
import DialogComponent from "../../../components/Dialog";
import { getTranslation } from "../../../heplers/translationHelper";

const AddBuildingDialog = ({ building, isOpen,onClose, onSubmit, enableEdit }) => {
  const initialValues = {
    name: "",
    address: "",
    zipCode: "",
    town: "",
    status:true,
  };

  const basicValidationSchema = Yup.object().shape({
    name: Yup.string().required(" Name is required"),
    address: Yup.string().required("Address is required"),
    town: Yup.string().required("town is required"),
    zipCode: Yup.string().required("Zip code is required")
    .test('non-negative', 'Zip code cannot be negative', value => {
      if (value) {
        const zipCode = parseInt(value);
        return zipCode > 0;
      }
      return true; // Skip validation if value is not provided
    }),
  });

  const defaultValue = building ? building : initialValues;
  return (
    <DialogComponent
      title={getTranslation("Add Building","Add Building","Add Building")}
      open={isOpen}
      onClose={onClose}
    >
      <br />
      <br />
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
          handleChange,
        }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="name"
                  label={getTranslation("Name","Name","Name")}
                  required
                  size="small"
                  variant="outlined"
                  name="name"
                  {...getFieldProps("name")}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="address"
                  label={getTranslation("Address","Address","Address")}
                  required
                  size="small"
                  variant="outlined"
                  name="address"
                  {...getFieldProps("address")}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="town"
                  label={getTranslation("Town","Town","Town")}
                  required
                  size="small"
                  variant="outlined"
                  name="town"
                  {...getFieldProps("town")}
                  error={touched.town && Boolean(errors.town)}
                  helperText={touched.town && errors.town}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="zipCode"
                  label={getTranslation("Zipcode","Zipcode","Zipcode")}
                  required
                  size="small"
                  variant="outlined"
                  name="zipCode"
                  type="number"
                  {...getFieldProps("zipCode")}
                  error={touched.zipCode && Boolean(errors.zipCode)}
                  helperText={touched.zipCode && errors.zipCode}
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
              <Typography>
              {getTranslation("Status","Status","Status")}
                <Switch
                  id="status"
                  checked={values.status}
                  onChange={handleChange}
                />
              </Typography>
              <ButtonWithLoading
                title={enableEdit ? getTranslation("Update","Update","Update") : getTranslation("Add","Add","Add")}
                size="small"
                variant="contained"
                color="primary"
                loading={isSubmitting}
                onClick={handleSubmit}
                type="submit"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </DialogComponent>
  );
};

export default AddBuildingDialog;
