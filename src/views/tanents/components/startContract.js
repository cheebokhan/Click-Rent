import { Card, CardContent, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Form, Formik } from "formik";
import { useState } from "react";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import { DatePicker } from "../../../components/DatePicker";
import DialogComponent from "../../../components/Dialog";
import { AvailableApartments } from "./availableApartments";
import { Get_AllAvailableApartments_Url } from "../../../constants/apiUrls";
import { useSnackbar } from "notistack";
import { Get } from "../../../actions";
import * as Yup from "yup";
import { getTranslation } from "../../../heplers/translationHelper";
export const StartContractDialog = ({
  buildings,
  tenantId,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [apartmentList, setApartmentList] = useState([]);
  const [apartmentListLoading, setApartmentListLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(new Date());

  const loadAvailableApartments = (buildingId, startDate) => {
    setApartmentListLoading(true);
    Get(
      {
        buildingId: buildingId,
        startDate: startDate,
      },
      Get_AllAvailableApartments_Url,
      null,
      (resp) => {
        setApartmentList(resp.data);
        setApartmentListLoading(false);
      },
      (error) => {
        enqueueSnackbar("Internal Server error", { variant: "error" });
        setApartmentListLoading(false);
      }
    );
  };

  const initialValue = {
    startDate: startDate,
    tenantId: tenantId,
    apartmentId: 0,
    currentRent: 0,
  };

  const basicValidationSchema = Yup.object().shape({
    startDate: Yup.date().required(" Start Date is Required is required"),
  });

  const defaultValue = initialValue;
  return (
    <DialogComponent
      maxWidth
      title={getTranslation(
        "Start Contract",
        "Dbut du contrat",
        "Vertrag starten"
      )}
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
              values.startDate=values.startDate.toDateString()
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
                  <Grid xs={12} sm={12} md={6} lg={6}>
                    <DatePicker
                      id="startDate"
                      variant="outlined"
                      size="small"
                      fullWidth
                      label={getTranslation(
                        "Start Date",
                        "Date de d�but",
                        "Startdatum"
                      )}
                      value={values.startDate}
                      onChange={(newDate) => {
                        setFieldValue("startDate", newDate);
                        setStartDate(newDate);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6}>
                    <Autocomplete
                      id="buildingId"
                      options={buildings}
                      //value={values.building}
                      getOptionLabel={(option) => option.name}
                      size="small"
                      onChange={(e, building) => {
                        loadAvailableApartments(building.id, values.startDate);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={getTranslation(
                            "Building",
                            "Immeubles",
                            "Immobilien"
                          )}
                          variant="outlined"
                          // error={touched.buildingId && Boolean(errors.buildingId)}
                        />
                      )}
                    />
                  </Grid>
                  <br />
                  <br />
                  <br />
                  <Grid xs={12} sm={12} md={12} lg={12}>
                    <AvailableApartments
                      loading={apartmentListLoading}
                      availableApartments={apartmentList}
                      onApartmentSelected={(row) => {
                        setFieldValue("apartment", row);
                        setFieldValue("apartmentId", row.id);
                        setFieldValue("currentRent", row.amount);
                      }}
                      selectedApartment={values.apartment}
                    />
                    <br />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      id="currentRent"
                      fullWidth
                      //disabled
                      label={getTranslation(
                        "Current Rent",
                        "Loyer actuel",
                        "Aktuelle Miete"
                      )}
                      required
                      size="small"
                      variant="outlined"
                      name={"currentRent"}
                      value={values.currentRent}
                      {...getFieldProps("currentRent")}
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
                      title={getTranslation(
                        "Start Contract",
                        "D�but du contrat",
                        "Vertrag starten"
                      )}
                      color="primary"
                      size="small"
                      variant="contained"
                      // loading={isSubmitting}
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
