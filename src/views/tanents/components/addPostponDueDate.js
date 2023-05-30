import React from "react";
import { Formik, Form } from "formik";
import { Box, Grid, TextField } from "@material-ui/core";
import { DatePicker } from "../../../components/DatePicker";

import { getTranslation } from "../../../heplers/translationHelper";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import * as Yup from "yup";
import DialogComponent from "../../../components/Dialog";

export const AddPostDueDate = ({ onSubmit,due, isOpen, onClose }) => {

  const basicValidationSchema = Yup.object().shape({
    postponedReason: Yup.string().required("Please add a Reason"),
    date: Yup.date().required("Please add a  Date"),
  });

  return (
    <>
      <DialogComponent
        title={getTranslation(
          "Add Postpone Due Date",
          "Ajouter une date d'échéance différée",
          "Fälligkeitsdatum verschieben hinzufügen"
        )}
        open={isOpen}
        onClose={onClose}
      >
        <br />
        <br />
        <Formik
          enableReinitialize
          initialValues={due}
          validationSchema={basicValidationSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            // values.date=values.date.toDateString()
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
            handleChange,
          }) => (
            <Form>
              {console.log("errorrrasdfr",errors,values)}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <DatePicker
                    label={getTranslation(
                      "Due Date",
                      "Date d'échéance",
                      "Geburtstermin"
                    )}
                    value={values.date}
                    required
                    onChange={(newDate) => {
                      setFieldValue("date", newDate);
                    }}
                    error={errors.date && touched.date}
                    helperText={errors.date && touched.date && errors.date}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    fullWidth
                    size="large"
                    id="postponedReason"
                    multiline
                    name="note"
                    label={getTranslation("Reason", "Raison", "Grund")}
                    required
                    type="text"
                    variant="outlined"
                    error={errors.postponedReason && touched.postponedReason}
                    helperText={errors.postponedReason && touched.postponedReason && errors.postponedReason}
                    {...getFieldProps("postponedReason")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Box
                  pr={1}
                  pb={1}
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <ButtonWithLoading
                    title={getTranslation(
                      "PostPone",
                      "Reporter",
                      "Verschieben"
                    )}
                    size="small"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  />
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogComponent>
    </>
  );
};