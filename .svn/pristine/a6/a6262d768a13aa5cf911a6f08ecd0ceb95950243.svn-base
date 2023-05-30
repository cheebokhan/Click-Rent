import { Box, CardActions, Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Form, Formik } from "formik";
import { DatePicker } from "../../../components/DatePicker";
import * as Yup from "yup";
import { getTranslation } from "../../../heplers/translationHelper";
import { tenantCategories } from "../../enums";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import { UploadFiles } from "../../../components/Upload";

export const AddTenatDue = ({ onSubmit, tanents,due }) => {

    const initialTenantValues = {
        category: 0,
        inOut: 0,
        amount: 0,
        //apartmentId: 0,
        tenantId: 0,
        //inputMode: 0,
        date: new Date(),
        comments: "",
        tenant: {},
        categoryValue: {},
        pdfDocumentId:''
    };


    const tenantValidationSchema = Yup.object().shape({
        amount: Yup.number().min(1).required("Amount is required"),
        category: Yup.number().min(0).required("Category is required"),
        //apartmentId: Yup.number().min(1).required("ApartmentId is required"),
        tenantId: Yup.number().min(1).required("Tenant Id is required"),
        comments: Yup.string().required("Comments required"),
    });

    return <Formik
        initialValues={initialTenantValues}
        validationSchema={tenantValidationSchema}
        onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            // values.inputMode = inputMode;
            // values.inOut = inputModeType;
            values.date = values.date.toDateString();
            if (due)
                values.comments =due.comments+ "\n" + values.amount + " | " + values.comments;
            else
                values.comments = values.amount + " | " + values.comments;

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
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Autocomplete
                            options={tanents}
                            value={values.tenant}
                            getOptionLabel={(options) => options.name}
                            size="small"
                            onChange={(e, tenant) => {
                                console.log("kjzghdfkjdz", tenant);
                                setFieldValue("tenant", tenant);
                                setFieldValue("tenantId", tenant?.id);
                                //setFieldValue("apartmentId", tenant?.apartmentId);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={getTranslation(
                                        "Tanents",
                                        "Locataires",
                                        "Mieter"
                                    )}
                                    variant="outlined"
                                    error={touched.tenantId && Boolean(errors.tenantId)}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Autocomplete
                            options={tenantCategories}
                            value={values.categoryValue}
                            getOptionLabel={(options) => options.label}
                            size="small"
                            onChange={(e, category) => {
                                setFieldValue("categoryValue", category);
                                setFieldValue("category", category.id);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={getTranslation(
                                        "Category",
                                        "Cat�gories",
                                        "Kategorien"
                                    )}
                                    variant="outlined"
                                    error={touched.category && Boolean(errors.category)}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <TextField
                            fullWidth
                            id="amount"
                            label={getTranslation("Amount", "Montant", "Betrag")}
                            required
                            size="small"
                            type="number"
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
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <DatePicker
                            label={getTranslation("Date", "Date", "Date")}
                            value={values.date}
                            required
                            onChange={(date, newDate) => {
                                setFieldValue("date", date);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            id="comments"
                            fullWidth
                            label={getTranslation(
                                "Comments",
                                "Commentaires",
                                "Kommentare"
                            )}
                            value={values.comments}
                            required
                            size="small"
                            variant="outlined"
                            onChange={(event, comment) => {
                                setFieldValue("comment", comment);
                            }}
                            name={"comments"}
                            {...getFieldProps("comments")}
                            error={touched.comments && Boolean(errors.comments)}
                            helperText={touched.comments && errors.comments}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    {/* this is area where iamge is goingto the next component  */}

                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <UploadFiles
                            uploadedFiles={
                                values.pdfDocumentId ? [values.pdfDocumentId] : []
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
                        <Typography variant="h5" style={{ marginLeft: "20px" }}>
                            {getTranslation(
                                "Attachment",
                                "Attachment",
                                "Attachment"
                            )}
                        </Typography>
                    </Grid>
                </Grid>
                <CardActions>
              <Box
                pr={1}
                pb={1}
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <ButtonWithLoading
                  title={due ? getTranslation("Update","Update","Update") : getTranslation("Add","Add","Add")}
                  size="small"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  onClick={(e) => {
                    
                    // setFieldValue(
                    //   "supplierCategoryId",
                    //   selectedSupplierCategory?.id
                    // );
                    handleSubmit(e);
                  }}
                />
              </Box>
            </CardActions>
            </Form>
        )}
    </Formik>

}