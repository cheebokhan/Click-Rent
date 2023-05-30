import Dialog from "../../../components/Dialog";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import {
  CardContent,
  CardActions,
  Grid,
  TextField,
  Box,
  Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import { getTranslation } from "../../../heplers/translationHelper";
import { DatePicker } from "./../../../components/DatePicker";
import { UploadFiles } from "../../../components/Upload";

export const UpdateDuesDialog = ({
  isOpen,
  currentAmount,
  dueDate,
  onClose,
  onSubmit,
  dueId,
  comments,
  pdfDocumentId
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    id: dueId,
    amount: currentAmount,
    // comments: comments,
    date: new Date(dueDate),
    pdfDocumentId:pdfDocumentId
  };

  const basicValidationSchema = Yup.object().shape({
    //id: Yup.number().min(0).required(" Id is required"),
    amount: Yup.number().min(1).required("Rent is required"),
    date: Yup.string().required("Please add a Date"),
    comments: Yup.string().required("Please add comments"),
  });

  const defaultValue = initialValues;
  return (
    <Dialog
      open={isOpen}
      title={getTranslation(
        "Update Due",
        "Mise � jour due",
        "Aktualisierung f�llig"
      )}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <div>
        <Formik
          enableReinitialize
          initialValues={defaultValue}
          validationSchema={basicValidationSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            values.date=values.date.toDateString();
            values.comments=comments + `\n` + values.amount + " | " + values.comments;
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
            setFieldTouched,
          }) => (
            <Form>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="amount"
                      label={getTranslation("Amount", "Montant", "Menge")}
                      required
                      size="small"
                      variant="outlined"
                      name="amount"
                      {...getFieldProps("amount")}
                      error={touched.amount && Boolean(errors.amount)}
                      helperText={touched.amount && errors.amount}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      fullWidth
                      id="comments"
                      label={getTranslation(
                        "Comments",
                        "Commentaires",
                        "Kommentare"
                      )}
                      required
                      size="small"
                      variant="outlined"
                      name="comments"
                      {...getFieldProps("comments")}
                      // error={touched.comments && Boolean(errors.comments)}
                      // helperText={touched.comments && errors.comments}
                      error={Boolean(errors.comments)}
                      helperText={errors.comments}
          
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onBlur={() => setFieldTouched("comments", true)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <DatePicker
                      label={getTranslation(
                        "Due Date",
                        "Date d'échéance",
                        "Geburtstermin"
                      )}
                      value={values.date}
                      required
                      onChange={(value,newDate) => {
                        setFieldValue("date", value);
                      }}
                      error={errors.date && touched.date}
                      helperText={errors.date && touched.date && errors.date}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                        <UploadFiles
                            uploadedFiles={
                                values.pdfDocumentId!=null ? [values.pdfDocumentId] : []
                            }
                            onAddFile={(file) => {
                                setFieldValue("pdfDocumentId", file);
                            }}
                            getFileName={(file) => file}
                            onDeleteFile={() => { }}
                            multiple={false}
                            onClick={(address) => {
                                // setPreviewImage(true)
                                // setPreviewImageAddress(address)
                            }}
                        />
                        <Typography variant="h5" style={{ marginLeft: "40px" }}>
                            {getTranslation(
                                "Attachment",
                                "Attachment",
                                "Attachment"
                            )}
                        </Typography>
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
                    title={getTranslation("Update","Update","Update")}
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
      </div>
    </Dialog>
  );
};
