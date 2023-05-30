import { Box, Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import Dialog from "./Dialog";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ButtonWithLoading from "./ButtonWithLoading";
import { getTranslation } from "../heplers/translationHelper";

export const DateIntervalDialog = ({ isOpen, onClose, onSubmit }) => {
  
  var currentYear = new Date().getFullYear();
  const initialValues = {
    startDate: new Date(currentYear, 0, 1),
    endDate: new Date(),
  };

  const basicValidationSchema = Yup.object().shape({
    startDate: Yup.date().required(" Start Date is Required is required"),
    endDate: Yup.date().required(" Start Date is Required is required"),
  });

  const defaultValue = initialValues;

  return (
    <div>
      <Dialog
        title={getTranslation("Period", "Point final", "Zeitraum")}
        open={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      >
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
              <Grid
                container
                spacing={2}
                style={{ margin: "15px", width: "auto" }}
              >
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <DatePicker
                    label={getTranslation("From", "De", "Von")}
                    value={values.startDate}
                    required
                    onChange={(newDate) => {
                      setFieldValue("startDate", newDate);
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <DatePicker
                    label={getTranslation("To", "�", "Bis")}
                  
                    value={values.endDate}
                    required
                    onChange={(newDate) => {
                      setFieldValue("endDate", newDate);
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
                  title={getTranslation("Generate Report","Generate Report","Generate Report")}
                  size="medium"
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
    </div>
  );
};
