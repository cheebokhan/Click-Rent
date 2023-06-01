import Dialog from "../../../components/Dialog";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Get, Post } from "../../../actions/apiActions";
import {
  CardContent,
  CardActions,
  Grid,
  TextField,
  Box,
  Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Get_AllTanenets_URL } from "../../../constants/apiUrls";
import { tenantCategories } from "../../enums";
import { getTranslation } from "../../../heplers/translationHelper";
import SplitFundtoTenant from "./splitFundtoTenant";
import FundtoCategorymapper from "./fundtoCategorymapper";

export const AddFundsToTenantDialog = ({
  counterpartName,
  remittanceinformation,
  amount,
  isOpen,
  editTenFunds,
  enableEdit,
  tenantDetails,
  onClose,
  onSubmit,
}) => {
  const [bankList, setBankList] = useState();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [tenantList, setTenantList] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("here is tenant detail: ", tenantDetails);
  //////////////////////////////// Get Supplier ///////////////////
  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = (values) => {
    Get(
      values,
      Get_AllTanenets_URL,
      history,
      (resp) => {
        setTenantList(resp?.data);
      },
      (error) => {
        enqueueSnackbar(
          getTranslation(
            " Can't Load the building! Internal server Error ",
            " Impossible de charger le b�timent�! Erreur interne du serveur ",
            " Das Geb�ude kann nicht geladen werden! Interner Serverfehler "
          )
        );
      }
    );
  };

  useEffect(()=>{
    if(counterpartName){
      // alert(counterpartName.toLowerCase().startsWith("Schons".toLowerCase()))
      console.log("jkashdjkashdjkasdasjhd",tenantList,tenantList.find(x => counterpartName.toLowerCase().startsWith(x.firstName.toLowerCase()) || counterpartName.toLowerCase().startsWith(x.lastName.toLowerCase())))
      setSelectedTenant(tenantList.find(x => counterpartName.toLowerCase().startsWith(x.firstName.toLowerCase()) || counterpartName.toLowerCase().startsWith(x.lastName.toLowerCase())))
  }},[counterpartName])
  const initialValues = {
    tenantId: 0,
    duesCategory: 0,
  };
  const basicValidationSchema = Yup.object().shape({
    tenantId: Yup.number()
      .min(
        1,
        getTranslation(
          " Tenant is required. ",
          " Le locataire est requis. ",
          " Mieter ist erforderlich. "
        )
      )
      .required("Tenant is required."),
      amount:Yup.number().min(1,"Add amount is required")
  });

  const defaultValue = editTenFunds ? editTenFunds : initialValues;

 
  // const [remainingValue, setRemainingValue] = useState();

  useEffect(() => {
  //  setTimeout(setRemainingValue(amount),1000);
  setFieldArray([{
    duesCategory: 0, amount: amount
  }])
  }, [amount]);
  
  const [fieldArray, setFieldArray] = useState([]);
  //for data saving 


  console.log("sdsdsdsdsdsd",fieldArray);

  // const [fundData, setFundData] = useState([]);
  // const handleDataChange = (duescategory, fund) => {
  //   // add the fundData to the fundData fieldArray
  //   if(fundData.length<tenantCategories.length){
  //     setFundData([...fundData, { duescategory, fund }]);
  //   }
  // };

  // console.log("dadadadadadad",fundData);

  // const handleValueChange = (value) => {
  //   const parsedValue = parseInt(value);
  //   if (parsedValue && parsedValue <= remainingValue) {
  //     const newRemainingValue = remainingValue - parsedValue;
  //     setRemainingValue(newRemainingValue);
  //     // add a new object to the fieldArray with a random duescategory and fund
  //     if(fieldArray.length<tenantCategories.length){
  //       setFieldArray([
  //         ...fieldArray,
  //         { duescategory: "cost", fund: newRemainingValue},
  //       ]);
  //     }
  //   } else {
  //     // setShowNextAutocomplete(false);
  //   }
  // };
  
  return (
    <Dialog
      open={isOpen}
      title={
        enableEdit
          ? getTranslation(
              "Update funds of Tenant",
              "Mettre à jour les fonds du locataire",
              "Aktualisieren Sie die Mittel des Mieters"
            )
          : getTranslation(
              "Add funds to Tenant",
              "Ajouter des fonds au locataire",
              "Fügen Sie dem Mieter Guthaben hinzu"
            )
      }
      onClose={onClose}
    >
      <div style={{ width: "500px" }}>
        <Formik
          enableReinitialize
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
            <form>
              {selectedTenant && selectedTenant?.id !== values.tenantId ? setFieldValue("tenantId", selectedTenant.id):null }
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Autocomplete
                      // inputValue={searchCategory}
                      // onInputChange={(e, value) => {
                      //     if (loading === false) {
                      //         setSearchCategory(value)
                      //     } else {
                      //         setLoading(false)
                      //     }
                      // }}

                      options={tenantList}
                      getOptionLabel={(option) => option.name}
                      value={selectedTenant}
                      size="small"
                      onChange={(e, tenant) => {
                        if (tenant) {
                          setFieldValue("tenantId", tenant?.id);
                          setSelectedTenant(tenant);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={getTranslation(
                            "Tenant",
                            "Locataires",
                            "Mieter"
                          )}
                          variant="outlined"
                          error={touched.tenantId && Boolean(errors.tenantId)}
                          
                        />
                      )}
                    />
                  </Grid>
                   <Grid item xs={12} sm={12} md={12} lg={12} >
                  <FundtoCategorymapper array={fieldArray} 
                      setArray={setFieldArray}
                      // handleValueChange={handleValueChange}
                       tenantCategories={tenantCategories}
                      // handleDataChange={handleDataChange}
                      transactionAmount={amount}
                      />
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
                  justifyContent="flex-end"
                >
                  <ButtonWithLoading
                    title={getTranslation("Confirm","Confirmer","Bestätigen")}
                    size="small"
                    variant="contained"
                    color="primary"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  />
                </Box>
              </CardActions>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography style={{ fontWeight: "bold" }}>
                  {getTranslation(
                    "Counter Part Name",
                    "Nom contre-partie",
                    "Name Gegenpartei"
                  )}
                  :{" "}
                </Typography>
                <Typography>{counterpartName}</Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {getTranslation("Amount", "Montant", "Betrag")}
                </Typography>
                <Typography>{amount?.toFixed(2)}</Typography>
                <Typography style={{ fontWeight: "bold" }}>
                  {getTranslation("Remittance Information","Renseignements sur les remises","Überweisungsinformationen")} :
                </Typography>
                <Typography>{remittanceinformation}</Typography>
                <br />
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};
