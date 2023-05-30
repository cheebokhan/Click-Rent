import React from "react";
import { Formik, Form } from "formik";
import { Box, Grid, TextField } from "@material-ui/core";
import { getTranslation } from "../../../heplers/translationHelper";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import * as Yup from "yup";
import DialogComponent from "../../../components/Dialog";

export const AddNoteDue = ({ onSubmit, isOpen, onClose }) => {
  const initalValues = {
    note: "",
  };

  const basicValidationSchema = Yup.object().shape({
    note: Yup.string().required("Please add a Note"),
  });
  const defaultValue = initalValues;
  return (
    <>
      <DialogComponent
        title={getTranslation(
          "Add Note",
          "Ajouter une note",
          "Notiz hinzufügen"
        )}
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
            handleChange,
          }) => (
            <Form>
              {console.log("kajdlkajd", errors)}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    fullWidth
                    size="small"
                    id="note"
                    multiline
                    name="note"
                    label={getTranslation("Note", "Noter", "Notiz")}
                    required
                    type="text"
                    variant="outlined"
                    error={errors.note && touched.note}
                    helperText={errors.note && touched.note && errors.note}
                    {...getFieldProps("note")}
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
                    title="Add"
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
