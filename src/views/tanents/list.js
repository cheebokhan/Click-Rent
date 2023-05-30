import { AddTanentDialog, Tanents } from "./components";
import React, { useEffect, useRef, useState } from "react";
import {
  Get_AllBuildings_URL,
  Get_AllTanentsWithPagination_URL,
  Get_AllTenantPrint_URL,
  Post_AddTanent_URL,
  Post_StartContract_URL,
} from "../../constants/apiUrls";
import { Get, Post } from "../../actions/apiActions";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { StartContractDialog } from "./components/startContract";
import { getTranslation } from "../../heplers/translationHelper";
import { AllTenantReport } from "./components/reports";
import { useReactToPrint } from "react-to-print";
import { Helmet } from "react-helmet";
import _ from "lodash";

// state management

const List = () => {
  const [openStartContractDialog, setOpenStartContractDialog] = useState(false);
  const history = useHistory();
  const [buildingList, setBuildingList] = useState([]);
  const [tenantListLoading, setTenantListLoading] = useState(false);
  const [addTenantDialog, setAddTenantDialog] = useState(false);
  const [tanentList, setTanentList] = useState();
  const [editTenant, setEditTenant] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [tenantId, setTenantId] = useState(0);
  const [printLoader,setPrintLoader]=useState(false);
  let pageSize = localStorage.getItem("sizeTent");
  if (pageSize == null) {
    localStorage.setItem("sizeTent", 10)
    pageSize = 10
  }
  const [filterItems, setFilterItems] = useState({
    status: "active",
    searchString: " ",
    pageNumber: 0,
    pageSize: pageSize,
    sort: "name",
    sortDirection: 0,
  });


  const [allTenantList, setAllTenantList] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "Clear_All_BreadCrumb" });
    dispatch({
      type: "Add_BreadCrumb",
      payload: {
        title: getTranslation(" Tanents ", " Tanents ", " Tanenten "),
        url: "/tanents",
      },
    });
  }, []);

  //////////////////////////// POST Tenant ////////////////////////////

  const submitTanent = async (values, actions) => {
    Post(
      values,
      Post_AddTanent_URL,
      history,
      (resp) => {
        if (values.startContract) {
          setTenantId(resp.data);
          setAddTenantDialog(false);
          enqueueSnackbar("Add Contract details", { variant: "info" });
          loadTenants();
          setOpenStartContractDialog(true);
        } else {
          enqueueSnackbar(
            getTranslation(
              " Tenant will move to inactive tab, due to missing contract ",
              " Le locataire passera � l'onglet inactif, en raison d'un contrat manquant ",
              " Der Mieter wird aufgrund des fehlenden Vertrags auf die inaktive Registerkarte verschoben "
            ),
            { variant: "success" }
          );
          loadTenants();
          actions.resetForm();
          loadTenants(filterItems);
        }
        setAddTenantDialog(false)
      },
      (onError) => {
        setAddTenantDialog(false);
        enqueueSnackbar(
          getTranslation(onError?.data, onError?.data, onError?.data),
          { variant: "error" }
        );
      }
    );
  };

  ////////////////////////// GET Building //////////////////////////

  useEffect(() => {
    loadBuildings();
  }, []);

  const loadBuildings = (values) => {
    Get(
      values,
      Get_AllBuildings_URL,
      history,
      (resp) => {
        setBuildingList(resp.data);
      },
      (error) => {
        enqueueSnackbar(
          getTranslation(
            " Buildings are not loaded. internal Server error ",
            " Les b�timents ne sont pas charg�s. Erreur interne du serveur ",
            " Geb�ude werden nicht geladen. interner Serverfehler "
          ),
          {
            variant: "error",
          }
        );
      }
    );
  };

  ////////////////////// GET Apartments //////////////////////

  ////////////////////////// GET TanentsWithPaginati on //////////////////////////
  // useEffect(() => {
  //   loadTenants(filterItems);
  // }, [filterItems]);

  const loadTenants = (values) => {
    setTenantListLoading(true);
    setFilterItems(values);
    Get(
      values,
      Get_AllTanentsWithPagination_URL,
      history,
      (resp) => {
        setTenantListLoading(false);
        setTanentList(resp?.data);
      },
      (error) => {
        setTenantListLoading(false);
        enqueueSnackbar(
          getTranslation(
            " Can't load tenants. Internal server error ",
            " Impossible de charger les locataires. Erreur interne du serveur ",
            " Mandanten knnen nicht geladen werden. Interner Serverfehler "
          ),
          {
            variant: "error",
          }
        );
      }
    );
  };

  //get all tanents
  const GetAllTanentData = () => {
    setPrintLoader(true)
    Get(
      filterItems,
      Get_AllTenantPrint_URL,
      history,
      (resp) => {
        console.log("sadasdadad", resp);
        setAllTenantList(resp?.data);
        setTimeout(()=>{
          handlePrint()
         setTimeout(()=> setPrintLoader(false),1000)}
          ,1000)

      },
      (error) => {
        setPrintLoader(false)
        setTenantListLoading(false);
        enqueueSnackbar(
          getTranslation(
            " Can't load all tenants. Internal server error ",
            " Impossible de charger les locataires. Erreur interne du serveur ",
            " Mandanten knnen nicht geladen werden. Interner Serverfehler "
          ),
          {
            variant: "error",
          }
        );
      }
    );
    console.log("fdfgdfgdfgdfgddfgd", "all tanent data ");
  }

  //this is the sum of all the tenant account balance record 
  //const tenantTotalBalance = _.sum(_.map(allTenantList, (tenant) => Math.abs(tenant.accountBalance)));
  const tenantTotalBalance = _.sumBy(allTenantList,"accountBalance");

  const handleEditTenant = (row) => {
    setTenantId(row?.id);
    setEditTenant(row);
    setOpenStartContractDialog(true);
  };
  const handleEditActivity = (row) => {
    setEditTenant(row);
    const url = `/tanents/${row.tenantId ? row.tenantId : row.id}/details`;
    dispatch({
      type: "Add_BreadCrumb",
      payload: { title: row.name, url: "/tanents" },
    });
    history.push(url);
  };
  //////// Start Tenant Contract ///////////
  const startTenantContract = (values, actions) => {
    Post(
      values,
      Post_StartContract_URL,
      null,
      (resp) => {
        enqueueSnackbar(
          getTranslation(
            " Your Contract will start on ",
            " Votre contrat d�butera le ",
            " Ihr Vertrag beginnt am "
          ) + values.startDate,
          {
            variant: "success",
          }
        );
        setOpenStartContractDialog(false);
        loadTenants();
      },
      (error) => {
        enqueueSnackbar(error.data, { variant: "error" });
      }
    );
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    // documentTitle: getTranslation("Tenant Report","Tenant Report","Tenant Report"),
    content: () => componentRef.current,
  });
  
  return (
    <div>
      <Helmet>
        <title>
          {getTranslation("tanents", "tanents", "tanents")}
        </title>
      </Helmet>


      <Tanents
        loading={tenantListLoading}
        rows={tanentList}
        printLoader={printLoader}
        onFilter={(values) => loadTenants(values)}
        onTenantChange={(row) => handleEditActivity(row)}
        // onSendReminder={handleSendReminder}
        viewCreate
        onCreate={() => setAddTenantDialog(true)}
        //onEditTenant={(row) => handleEditTenant(row)}
        onPrint={() => GetAllTanentData()}
        onRefresh={() => {
          loadTenants(filterItems)
        }
        }
      />
      {/* Dialog */}
      <AddTanentDialog
        isOpen={addTenantDialog}
        onClose={() => setAddTenantDialog(false)}
        onSubmit={submitTanent}
      />
      <StartContractDialog
        buildings={buildingList}
        tenantId={tenantId}
        isOpen={openStartContractDialog}
        onClose={() => {
          setOpenStartContractDialog(false);
        }}
        onSubmit={startTenantContract}
      />
      <div style={{ display: 'none' }}>
        <AllTenantReport data={{ filterItems: filterItems, rows: allTenantList, totalBalance: tenantTotalBalance }} ref={componentRef} />
      </div>
    </div>
  );
};
export default List;
