import { Box, CardActions, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Form, Formik } from "formik";
import { DatePicker } from "../../../components/DatePicker";
import * as Yup from "yup";
import { getTranslation } from "../../../heplers/translationHelper";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import { useEffect, useState } from "react";

export const AddSupplierDue = ({
  onSubmit,
  suppliers,
  loadSupplierCategory,
  supplierCategories,
  due,
  buildings
}) => {
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState({});
  useEffect(() => {
    if (supplierCategories.length > 0)
      setSelectedSupplierCategory(supplierCategories[0]);
  }, [supplierCategories]);

  const initialSupplierValues = {
    amount: 0,
    inOut: 0,
    supplierId: 0,
    supplierCategoryId: 0,
    //inputMode: 1,
    date: new Date(),
    comments: "",
    supplier: {},
    building:{},
    buildingId:0
  };
  const supplierValidationSchema = Yup.object().shape({
    amount: Yup.number().min(1).required("Amount is required"),
    supplierId: Yup.number().min(1).required("Supplier is required"),
    buildingId: Yup.number().min(1).required("Building is required"),
    supplierCategoryId: Yup.number()
      .min(0)
      .required("Supplier Category is required"),
    comments: Yup.string().required("Comments required"),
  });
  return (
    <Formik
      initialValues={initialSupplierValues}
      validationSchema={supplierValidationSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        // values.inputMode = inputMode;
        // values.inOut = inputModeType;
        values.supplierCategoryId = selectedSupplierCategory.id;
        values.date = values.date.toDateString();
        onSubmit(values, actions);
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
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Autocomplete
                options={buildings}
                value={values.building}
                getOptionLabel={(options) => options.name}
                size="small"
                onChange={(e, building) => {
                  if (building) {
                    setFieldValue("buildingId", building?.id);
                    setFieldValue("building", building);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={getTranslation(
                      "Building",
                      "Building",
                      "Building"
                    )}
                    variant="outlined"
                    error={touched.buildingId && Boolean(errors.buildingId)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Autocomplete
                options={suppliers}
                value={values.supplier}
                getOptionLabel={(options) => options.company}
                size="small"
                onChange={(e, supplier) => {
                  if (supplier) {
                    setFieldValue("supplierId", supplier?.id);
                    setFieldValue("supplier", supplier);
                    //setSupplier(supplier);
                    loadSupplierCategory(supplier?.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={getTranslation(
                      "Supplier",
                      "Le fournisseur",
                      "Anbieter"
                    )}
                    variant="outlined"
                    error={touched.supplierId && Boolean(errors.supplierId)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              {supplierCategories.length === 1 ? (
                <TextField
                  id="supplierId"
                  fullWidth
                  label={getTranslation("Category", "Cat�gories", "Kategorien")}
                  value={selectedSupplierCategory?.name}
                  required
                  // disabled
                  size="small"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <Autocomplete
                  disabled={supplierCategories.length === 0}
                  options={supplierCategories}
                  value={selectedSupplierCategory}
                  getOptionLabel={(options) => options.name}
                  size="small"
                  onChange={(e, category) => {
                    setFieldValue("supplierCategoryId", category?.id);
                    setSelectedSupplierCategory(category);
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
                      error={
                        touched.supplierCategoryId &&
                        Boolean(errors.supplierCategoryId)
                      }
                    />
                  )}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <TextField
                fullWidth
                id="amount"
                label={getTranslation("Amount", "Montant", "Betrag")}
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
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <DatePicker
                label={getTranslation("Date", "Date", "Date")}
                value={values.date}
                required
                onChange={(newDate) => {
                  setFieldValue("date", newDate);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="comments"
                fullWidth
                label={getTranslation("Comments", "Commentaires", "Kommentare")}
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
                title={
                  due
                    ? getTranslation("Update", "Mise jour", "Speichern")
                    : getTranslation("Add", "Ajouter", "Addieren")
                }
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
  );
};
