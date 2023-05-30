import React, { useState } from "react";
import {
  CardActions,
  Grid,
  TextField,
  Box,
  Typography,
} from "@material-ui/core";
import { DatePicker } from "../../../components/DatePicker";
import { Form, Formik } from "formik";
import {
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
} from "@material-ui/lab";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Get } from "../../../actions";
import { Get_AttachedSupplierCategories_URL } from "../../../constants/apiUrls";
import { tenantCategories } from "../../enums";
import DialogComponent from "../../../components/Dialog";
import { getTranslation } from "../../../heplers/translationHelper";
import { AddTenatDue } from "./addTenantDue";
import { AddSupplierDue } from "./addSupplierDue";

const AddDue = ({ due, isOpen, onClose, onSubmit, tanents, suppliers,buildings }) => {
  const [supplierCategories, setSupplierCategories] = useState([]);

  const [inputMode, setInputMode] = useState(0);
  const [inputModeType, setInputModeType] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [supplier, setSupplier] = useState({});


  const loadSupplierCategory = (supplierId) => {
    Get(
      { supplierId: supplierId },
      Get_AttachedSupplierCategories_URL,
      null,
      (resp) => {
        // if(resp?.data.length>=1)
        // setSelectedSupplierCategory(resp?.data[0])
        setSupplierCategories(resp?.data);
      },
      (error) => {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    );
  };

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
  };

  const initialSupplierValues = {
    amount: 0,
    inOut: 0,
    supplierId: 0,
    supplierCategoryId: 0,
    //inputMode: 1,
    date: new Date(),
    comments: "",
    supplier: {},
  };

  const tenantValidationSchema = Yup.object().shape({
    amount: Yup.number().min(1).required("Amount is required"),
    category: Yup.number().min(0).required("Category is required"),
    //apartmentId: Yup.number().min(1).required("ApartmentId is required"),
    tenantId: Yup.number().min(1).required("Tenant Id is required"),
    comments: Yup.string().required("Comments required"),
  });

  const supplierValidationSchema = Yup.object().shape({
    amount: Yup.number().min(1).required("Amount is required"),
    supplierId: Yup.number().min(1).required("supplierId is required"),
    supplierCategoryId: Yup.number()
      .min(1)
      .required("SupplieCategoryId Id is required"),
    comments: Yup.string().required("Comments required"),
  });


  return (
    <DialogComponent
      open={isOpen}
      onClose={onClose}
      title={getTranslation(
        "Add Dues",
        "Ajouter des cotisations",
        "Geb�hren hinzuf�gen"
      )}
      fullwidth
      maxWidth={"md"}
    >
      <br />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <ToggleButtonGroup
          size="small"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          id="inOut"
          value={inputModeType}
          exclusive
          onChange={(event, dueStatus) => {
            if (dueStatus !== null) {
              setInputModeType(dueStatus);
            }
          }}
        >
          <ToggleButton value={0} aria-label="left aligned">
            <Typography>{getTranslation("Payment","Payment","Payment")}</Typography>
          </ToggleButton>
          {
            inputMode==1?"":
            <ToggleButton value={1} aria-label="centered" >
            <Typography>{getTranslation("Due","Due","Due")}</Typography>
            </ToggleButton>
          }
          
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="small"
          style={{
            marginLeft: "20px",
          }}
          id="inputMode"
          defaultChecked={inputMode}
          value={inputMode}
          exclusive
          onChange={(event, mode) => {
            if (mode !== null) {
              console.log("shgjkhsfg", mode);
              setInputMode(mode);
            }
          }}
        >
          <ToggleButton value={0} aria-label="left aligned">
            <Typography>{getTranslation("Tenant", "Locataire", "Mieter")}</Typography>
          </ToggleButton>
          <ToggleButton value={1} aria-label="centered">
            <Typography>{getTranslation("Supplier", "Le fournisseur", "Anbieter")}</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Grid container spacing={2}>
        {inputMode === 0 ? (
          <AddTenatDue
            onSubmit={(values, actions) => {
              values.inputMode = inputMode;
              values.inOut = inputModeType;
              onSubmit(values, actions)
            }} tanents={tanents} due={due} />
        ) : (
          <AddSupplierDue
            onSubmit={(values, actions) => {
              values.inputMode = inputMode;
              values.inOut = inputModeType;
              onSubmit(values, actions)
            }}
            suppliers={suppliers}
            supplierCategories={supplierCategories}
            loadSupplierCategory={loadSupplierCategory}
            due={due} 
            buildings={buildings}
            />
        )}
      </Grid>
    </DialogComponent>
  );
};

export default AddDue;
