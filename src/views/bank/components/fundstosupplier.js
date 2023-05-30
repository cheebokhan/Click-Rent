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
  InputLabel,
  Box,
  Typography,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";

import * as Yup from "yup";
import { Form, Formik } from "formik";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Get_AllBuildings_URL,
  Get_AllSuppliers_Url,
  Get_AllBanks_URL,
  Post_AddFundToSupplier_URL,
  Get_AttachedSupplierCategories_URL,
} from "../../../constants/apiUrls";
import { getTranslation } from "../../../heplers/translationHelper";
import { Alert } from "@material-ui/lab";

export const AddFundsToSupplierDialog = ({
  counterpartName,
  remittanceinformation,
  company,
  enableEdit,
  amount,
  isOpen,
  editSupFunds,
  onClose,
  onSubmit,
}) => {
  const [bankId, setBankId] = useState();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [buildingList, setBuildingList] = useState();
  const [supplierList, setSupplierList] = useState([]);
  const [supplierCategories, setSupplierCategories] = useState([]);
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState(0);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  //////////////////////////////// Get Buildings ///////////////////
  useEffect(() => {
    loadBuilding();
  }, []);
  const loadBuilding = (values) => {
    Get(
      values,
      Get_AllBuildings_URL,
      history,
      (resp) => {
        console.log("Here is building list: ", resp);
        setBuildingList(resp?.data);
      },
      (error) => {
        enqueueSnackbar(
          getTranslation(
            " Can't Load the building!! ",
            " Impossible de charger le b�timent�! ",
            " Das Geb�ude kann nicht geladen werden! "
          )
        );
      }
    );
  };
  //////////////////////////////// Get Supplier ///////////////////
  useEffect(() => {
    loadSupplier();
  }, []);
  const loadSupplier = (values) => {
    Get(
      values,
      Get_AllSuppliers_Url,
      history,
      (resp) => {
        console.log("Here is supplier list: ", resp);
        setSupplierList(resp?.data);
      },
      (error) => {
        enqueueSnackbar(
          getTranslation(
            " Can't load suppliers! ",
            " Impossible de charger les fournisseurs�! ",
            " Lieferanten k�nnen nicht geladen werden! "
          ),
          { variant: "error" }
        );
      }
    );
  };

  useEffect(()=>{
    if(counterpartName){
      var supplier =supplierList.find(x=>x.company.toLowerCase().startsWith(counterpartName.slice(0,3).toLowerCase(),0))
    if(supplier){
    setSelectedSupplier(supplier)
    loadSupplierCategories(supplier.id)

    }else{
       setSelectedSupplier(null)
    loadSupplierCategories(supplier?.id)

    }

  }},[counterpartName])

  useEffect(() => {
    if (editSupFunds) loadSupplierCategories(editSupFunds.supplierId);
  }, [editSupFunds]);

  const [loadingCategories,setLoadingCategories]=useState(false)

  const loadSupplierCategories = (id) => {
    setLoadingCategories(true)
    Get(
      { supplierId: id },
      Get_AttachedSupplierCategories_URL,
      history,
      (resp) => {
        setSupplierCategories(resp?.data);
        if(resp.data.length>0)
          setSelectedSupplierCategory(resp?.data[0]?.id);
    setLoadingCategories(false)
  },
      (error) => {
    setLoadingCategories(false)
    enqueueSnackbar(
          getTranslation(
            " Can't load supplier categories! ",
            " Impossible de charger les cat�gories de fournisseurs�! ",
            " Lieferantenkategorien k�nnen nicht geladen werden! "
          ),
          {
            variant: "error",
          }
        );
      }
    );
  };
  const initialValues = {
    supplierId: 0,
    buildingId: 0,
    supplierCategoryId: 0,
  };
  console.log("kamfk", supplierCategories);

  const basicValidationSchema = Yup.object().shape({
    supplierId: Yup.number()
      .min(1)
      .required(
        getTranslation(
          " An apartment number is required ",
          " Un num�ro d'appartement est requis ",
          " Eine Wohnungsnummer ist erforderlich "
        )
      ),
    buildingId: Yup.number()
      .min(1)
      .required(
        getTranslation(
          " Rent is required ",
          " Le loyer est obligatoire ",
          " Miete ist erforderlich "
        )
      ),
    // supplierCategoryId: Yup.number()
    //   .min(1)
    //   .required("Supplier Category is required"),
  });

  const defaultValue = editSupFunds ? editSupFunds : initialValues;

  const [errorMessage,setErrorMessage]=useState();


  return (
    <Dialog
      open={isOpen}
      title={
        enableEdit
          ? getTranslation(
              "Update funds of supplier",
              "Aktualisieren Sie die Mittel des Lieferanten",
              "Mettre à jour les fonds du fournisseur"
            )
          : getTranslation(
              "Add funds to supplier",
              "Ajouter des fonds au fournisseur",
              "Fügen Sie dem Lieferanten Geld hinzu"
            )
      }
      onClose={()=>{
        setSupplierCategories([])
        setSelectedSupplierCategory(0)
        onClose();
      }}
    >
      <div>
        <Formik
          enableReinitialize
          initialValues={defaultValue}
          validationSchema={basicValidationSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            if (selectedSupplierCategory == 0) {
              setErrorMessage("No Supplier category is selected")
              return;
            }
            if (values.supplierId == 0) {
              setErrorMessage("No Supplier is selected")
              return;
            }
            if (values.buildingId == 0) {
              setErrorMessage("No Building is selected")
              return;
            }
            values.supplierCategoryId=selectedSupplierCategory
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
              {selectedSupplier && selectedSupplier?.id !== values.supplierId ? setFieldValue("supplierId", selectedSupplier.id):null }
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Autocomplete
                      options={supplierList}
                      getOptionLabel={(option) => option.company}
                      value={selectedSupplier}
                      size="small"
                      onChange={(e, supplier) => {
                        setFieldValue("supplierId", supplier?.id);
                        setSelectedSupplier(supplier);
                        if (supplier) {
                          loadSupplierCategories(supplier?.id);
                          setFieldValue("supplier", supplier);
                        } else {
                          setFieldValue("supplier", null);
                        setFieldValue("supplierId", 0);
                        setSelectedSupplierCategory(0)
                        setSupplierCategories([])
                          //setFieldValue("supplierCategoryId", 0);
                        }
                        //setSupplierCategories([]);
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          label={getTranslation(
                            "Select Supplier",
                            "Selectionnez le fournisseur",
                            "Wehlen Sie Lieferant aus"
                          )}
                          variant="outlined"
                          error={
                            touched.supplierId && Boolean(errors.supplierId)
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Autocomplete
                      options={buildingList}
                      getOptionLabel={(option) => option.name}
                      value={values.building}
                      size="small"
                      onChange={(e, building) => {
                        setFieldValue("building", building);
                        setFieldValue("buildingId", building?.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={getTranslation(
                            "Select Building",
                            "S�lectionnez le b�timent",
                            "W�hlen Sie Geb�ude aus"
                          )}
                          variant="outlined"
                          error={
                            touched.buildingId && Boolean(errors.buildingId)
                          }
                        />
                      )}
                    />
                  </Grid>


                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControl fullWidth variant="outlined" >
                    <InputLabel shrink htmlFor="outlined-age-native-simple">
                      {getTranslation("Select Supplier Category","Sélectionnez la catégorie de fournisseur","Wählen Sie Lieferantenkategorie aus")}
                      </InputLabel>
                      <Select
                        native
                        disabled={supplierCategories.length === 0}
                        options={supplierCategories}
                        value={selectedSupplierCategory}
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}
                        label={getTranslation("Select Supplier Category","Sélectionnez la catégorie de fournisseur","Wählen Sie Lieferantenkategorie aus")}
                        onChange={(e) => {
                          setSelectedSupplierCategory(e.target.value)
                          setFieldValue("supplierCategoryId", e.target.value);
                          setFieldValue("supplierCategory", null);
                        }}
                       
                      >
                        {supplierCategories && supplierCategories.length>0? supplierCategories.map((category, index) => (
                          <option  value={category.id}>
                            {category.name}
                          </option >
                        ) ): <option  value={0}>
                        {getTranslation("No Category Found")}
                      </option >}
                      </Select>
                      {errorMessage ? <Alert severity="error" style={{marginTop:"10px"}}>{errorMessage}</Alert>:null}
                    </FormControl>
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

                <Typography style={{ fontWeight: "bold" }}>{getTranslation("Amount  :","Montant  :","Menge  :")} </Typography>
                <Typography>{amount?.toFixed(2)}</Typography>
                <Typography style={{ fontWeight: "bold" }}>
                {getTranslation("Remittance Information :","Renseignements sur les remises","Überweisungsinformationen")}
                </Typography>
                <Typography>{remittanceinformation}</Typography>
                <br />
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};
