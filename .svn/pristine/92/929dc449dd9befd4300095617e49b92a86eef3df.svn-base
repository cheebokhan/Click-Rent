import { AddDetails, Details, PrintDialog } from "./components";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { Get, Post } from "../../../../actions";
import {
  Get_AllFundActivitiesWithPagination_URL,
  Get_Tanenet_URL,
  Post_UpdateTanents_URL,
} from "../../../../constants/apiUrls";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { ContractsTable } from "./components/contracts";
import { getTranslation } from "../../../../heplers/translationHelper";

//state management
const List = () => {
  const [dueList, setDueList] = useState([]);
  const [duesLoading, setDuesLoadign] = useState(false);
  const [activeContract, setActiveContract] = useState(null);

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: getTranslation("Tenant Report","Tenant Report","Tenant Report"),
    content: () => componentRef.current,
  });
  const { tenantId } = useParams();

  const [tenant, setTenant] = useState();

  useEffect(() => {
    getTenant(tenantId);
  }, [tenantId]);
  const getTenant = (values) => {
    Get(
      { tenantId: values },
      Get_Tanenet_URL,
      history,
      (resp) => {
        setTenant(resp?.data);
      },
      (error) => {}
    );
  };

  ///////////////// load Dues /////////////////////////
  const loadDues = (values) => {
    setDuesLoadign(true);
    Get(
      values,
      Get_AllFundActivitiesWithPagination_URL,
      history,
      (resp) => {
        setDuesLoadign(false);
        setDueList(resp?.data);
      },
      (error) => {
        enqueueSnackbar("Internal server Error", { variant: "error" });
      }
    );
  };
  ///////////////// load Contracts /////////////////

  const handleEditTenant = (tenant) => {
    setTenant(tenant);
  };
  const updateTenant = (values, actions) => {
    console.log("jkhajkldhalsjkdh",values)
    Post(
      values,
      Post_UpdateTanents_URL,
      history,
      (resp) => {
        actions.setSubmitting(false);
        enqueueSnackbar("Tenant updated", {
          variant: "success",
        });
      },
      (error) => {
        enqueueSnackbar(error?.data, {
          variant: "error",
        });
      }
    );
  };

  return (
    <div>
      <AddDetails
        onSubmit={updateTenant}
        onEditTenant={handleEditTenant}
        printDetails={handlePrint}
        tenant={tenant}
      />
      <br />
      <ContractsTable setActiveContract={(contract)=> {
        setActiveContract(contract)
        }} />
      <br />

      <Details
        tenantId={tenantId}
        loading={duesLoading}
        rows={dueList}
        onFilter={(values) => loadDues(values)}
      />
      <br />
      <div style={{ display: "none" }}>
        <PrintDialog activeContract={activeContract} tenant={tenant} rows={dueList} ref={componentRef} />
      </div>
    </div>
  );
};
export default List;
