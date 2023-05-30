import { Box, Card, CardContent, Grid } from "@material-ui/core";
import ButtonWithLoading from "../../../../../components/ButtonWithLoading";
import { DatePicker } from "../../../../../components/DatePicker";
import DialogComponent from "../../../../../components/Dialog";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useParams } from "react-router";
import { getTranslation } from "../../../../../heplers/translationHelper";
import moment from "moment";

export const EndContractDialog = ({ isOpen, endContractId, date, type, onClose, onSubmit }) => {
  
  console.log("jkalshkjasdjkasdjhasd", date, moment(date).year()==1)
  
  const initialValues = {
    id: endContractId,
    date: moment(date).year()>1 ? new Date(date):new Date(),
    type:type
  };

  const basicValidationSchema = Yup.object().shape({
    date: Yup.date().required("End Date is required"),
  });

  const defaultValue = initialValues;
  return (
    <DialogComponent
      fullWidth
      title={type=="start"? getTranslation("Modify Start Date","Modify Start Date","Modify Start Date") : getTranslation("Modify End Date","Modify End Date","Modify End Date")}
      open={isOpen}
      onClose={onClose}
    >
      <Card>
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={defaultValue}
            validationSchema={basicValidationSchema}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              console.log("asdasdasd",values.date)
              values.date=values.date.toDateString();
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
                {console.log("jshdkjgfsg",errors)}
                <Grid container>
                  <Grid xs={12} sm={12} md={6} lg={6}>
                    <DatePicker
                      label="Date"
                      value={values.date}
                      required
                      onChange={(newDate) => {
                        setFieldValue("date", newDate);
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
                      title={getTranslation("Change","Change","Change")}
                      color="primary"
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
