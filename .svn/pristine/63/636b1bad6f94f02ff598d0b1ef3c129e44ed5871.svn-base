import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Get, Post } from "../../../../../actions";
import ButtonWithLoading from "../../../../../components/ButtonWithLoading";
import Table from "../../../../../components/table";

import {
  Get_AllBuildings_URL,
  Get_AllContractsWithPagination_URL,
  Post_ChangeContractDate_URL,
  Post_UpdateContract_URL,
  Post_StartContract_URL,
} from "../../../../../constants/apiUrls";
import { EndContractDialog } from "./endContractDialog";
import { UpdateContractDialog } from "./updateContractDialog";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import { StartContractDialog } from "../../startContract";
import { EndContractIcon } from "../../../../../components/icons";
import { getTranslation } from "../../../../../heplers/translationHelper";
import { EditButton } from "../../../../../components/ButttonsWithIcons";
import { format } from "../../../../../heplers/format";
import { Edit } from "@material-ui/icons";
import _ from "lodash";


export const ContractsTable = ({setActiveContract}) => {
  const [openEndContractDialog, setOpenEndContractDialog] = useState(false);
  const [openStartContractDialog, setOpenStartContractDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    localStorage.getItem("sizeCont")
  );
  const [searchString, setSearchString] = useState("");
  const [sort, setSort] = useState("date");
  const [sortDirection, setSortDirection] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [contractsList, setContractsList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [endContractId, seEndContractId] = useState({});
  const [isContractClosed, setIsCotractColsed] = useState(false);
  const { tenantId } = useParams();
  const [updateContractDialogOpen, setUpdateContractDialogOpen] =
    useState(false);
  const [contract, setContract] = useState(0);


  const columns = [
    {
      // 0 = onNotice, 1 = available, 2 = occupied, 3 = reserve, 4 cancel
      id: "startDate",
      disablePadding: true,
      label: getTranslation("Start Date", "Date de début", "Anfangsdatum"),
      format:"date",
      component: ({ row }) => (
        <Box justifyContent={"center"}>
          <Typography style={{ display: "inline" }}>{format("date", row.startDate)}</Typography>
          <IconButton size="small" color="secondary" onClick={() => handleChangeContractDateDialog(row, "start")} >
            <Edit fontSize="small" />
          </IconButton>

        </Box>
      )
    },
    {
      // 0 = onNotice, 1 = available, 2 = occupied, 3 = reserve, 4 cancel
      id: "endDate",
      disablePadding: true,
      label: getTranslation("End Date", "Date de début", "Anfangsdatum"),
      format:"date",
      component: ({row}) => (
        row.status == 2 || row.status == 3 ?
        <IconButton onClick={() => handleChangeContractDateDialog(row, "end")} >
            <Tooltip
              title={getTranslation(
                "End Contract",
                "Fin du contrat",
                "Vertrag beenden"
              )}
              arrow
              placement="top"
            >
              <ExitToAppOutlinedIcon />
            </Tooltip>
          </IconButton> :
          <Box justifyContent={"center"}>
  
            <Typography style={{ display: "inline" }}>{format("date", row.endDate)}</Typography>
            <IconButton size="small" color="secondary" onClick={()=>handleChangeContractDateDialog(row,"end")} >
              <Edit fontSize="small" />
            </IconButton>
  
  </Box>
      )
    },
    {
      // 0 = onNotice, 1 = available, 2 = occupied, 3 = reserve, 4 cancel
      id: "statusText",
      disablePadding: true,
      label: getTranslation("Status", "Statut", "Status"),
      component:({row})=><Typography> {
        row.statusText.replace( "Occupied",  getTranslation("Occupied","occupé ","belegt"))
        .replace( "Reserved",  getTranslation("Reserved","Reserved","Reserved"))
        .replace( "Available",  getTranslation("Available","disponible ","Available"))
        .replace( "Replaced",  getTranslation("Replaced","Replaced","Replaced"))
        .replace( "On Notice Period",  getTranslation("On Notice Period","On Notice Period","On Notice Period"))
      }</Typography>
    },
    {
      id: "apartmentNo",
      numeric: false,
      disablePadding: true,
      label: getTranslation("Apartment Name", "Logement Nr", "Wohnung Nr"),
    },
    
  
    {
      id: "buildingName",
      numeric: false,
      disablePadding: true,
      label: getTranslation("Building", "Immeubles", "Immobilien"),
    },
    {
      id: "currentRent",
      numeric: false,
      disablePadding: true,
      label: getTranslation("Rent", "Louer", "Mieten"),
      component: ({ row }) => (
        <Box justifyContent={"center"}>
          <Typography style={{ display: "inline" }}>{format("number", row.currentRent)}</Typography>
          {row.status==4  || row.status==0 || row.status==3? null :
          <IconButton size="small" color="secondary" onClick={() => onEdit(row)} >
            <Edit fontSize="small" />
          </IconButton>}
        </Box>
      )
    },

  ];

  useEffect(() => {
    loadTenantContracts({
      searchString,
      pageNumber: page,
      pageSize: rowsPerPage,
      sort: sort,
      sortDirection: sortDirection,
    });
  }, [page, searchString, rowsPerPage, sort, sortDirection]);

  const loadTenantContracts = () => {
    Get(
      { tenantId: tenantId },
      Get_AllContractsWithPagination_URL,
      null,
      (resp) => {
        setContractsList(resp?.data);
        let active=resp?.data?.data.find(x=>x.status==2)
        if (active)
          {
            setActiveContract(active)
          }
        else 
        {
          setActiveContract(resp?.data?.data.find(x => x.status == 0))
          console.log("adasdasdasd", resp?.data?.data.find(x => x.status == 0))
        
        }
        
        const count = resp?.data?.data.filter(x=>x.status==4)
        setIsCotractColsed(count?.length==resp?.data?.data.length)
      },
      (error) => {
        enqueueSnackbar(error.data, { variant: "error" });
      }
    );
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem("sizeCont", parseInt(event.target.value));

    setRowsPerPage(localStorage.getItem("sizeCont"));
    setPage(0);
  };

  const handleSearchDetails = (searchString) => {
    setSearchString(searchString);
  };

  ///////// End Contract //////////
  // const endTenantContract = (values, actions) => {
  //   Post(
  //     values,
  //     Post_EndContract_URL,
  //     null,
  //     (resp) => {
  //       actions.setSubmitting(false);
  //       setOpenEndContractDialog(false);
  //       enqueueSnackbar("Contract Ended", { variant: "success" });
  //       loadTenantContracts();
  //     },
  //     (error) => {
  //       setOpenEndContractDialog(false);
  //       enqueueSnackbar(error.data, { variant: "error" });
  //     }
  //   );
  // };
  useEffect(() => {
    console.log("gahfasdf", contractsList);
  }, []);

  const handleChangeContractDateDialog = (row,type) => {
    setOpenEndContractDialog(true);
    seEndContractId({row:row,type:type});
  };

  const changeContractDate=(values,actions)=>{
    Post(
      values,
      Post_ChangeContractDate_URL,
      null,
      (resp) => {
        actions.setSubmitting(false);
        setOpenEndContractDialog(false);
        enqueueSnackbar("Contract Ended", { variant: "success" });
        loadTenantContracts();
      },
      (error) => {
        setOpenEndContractDialog(false);
        enqueueSnackbar(error.data, { variant: "error" });
      }
    );
  }

  ////////////////////////// GET Building //////////////////////////

  useEffect(() => {
    loadBuildings();
  }, []);

  const loadBuildings = (values) => {
    Get(
      values,
      Get_AllBuildings_URL,
      null,
      (resp) => {
        setBuildingList(resp.data);
      },
      (error) => {
        enqueueSnackbar("Buildings not loaded. internal Server error", {
          variant: "error",
        });
      }
    );
  };

  //////// Start Tenant Contract ///////////
  const startTenantContract = (values, actions) => {
    Post(
      values,
      Post_StartContract_URL,
      null,
      (resp) => {
        enqueueSnackbar("Your Contract will start on " + values.startDate, {
          variant: "success",
        });
        setOpenStartContractDialog(false);
        //loadTenants();
        loadTenantContracts();
        actions.resetForm();
      },
      (error) => {
        enqueueSnackbar(error.data, { variant: "error" });
      }
    );
  };

  const handleUpdateContract = (values, actions) => {
    actions.setSubmitting(true);
    Post(
      values,
      Post_UpdateContract_URL,
      null,
      (resp) => {
        actions.setSubmitting(false);
        setUpdateContractDialogOpen(false);
        enqueueSnackbar("Contract Updated Successfully", {
          variant: "success",
        });
        loadTenantContracts();
      },
      (error) => {
        actions.setSubmitting(false);
      }
    );
  };

  const onEdit = (row) => {
    if(row.status==4  || row.status==0){
      enqueueSnackbar("Contract cannot be modify",{variant:"warning"})
      return;
    }else{
    setContract(row);
    setUpdateContractDialogOpen(true);
  }
};

  return (
    <>
      <Card>
        <CardHeader
          title={getTranslation("Contracts", "Contrats", "Vertr�ge")}
        />
        <CardContent>
          {contractsList.totalCount === 0 || isContractClosed ? (
            <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
              <ButtonWithLoading
                style={{
                  background: "#FF0000",
                  color: "white",
                }}
                title={getTranslation(
                  "Start Contract",
                  "D�but du contrat",
                  "Vertrag starten"
                )}
                variant="contained"
                size="small"
                onClick={() => setOpenStartContractDialog(true)}
              />
            </Box>
          ) : null}
          <br />
          <Table
            dense
            colums={columns}
            sortBy="date"
            sortDirection="desc"
            rows={contractsList.data}
            count={contractsList.totalCount}
            page={0}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            actions={[
              // {
              //   component: (row) => (
              //     <IconButton onClick={() => handleEndContractDialog(row)}>
              //       {row.statusText === "Closed" ? null : (
              //       <Tooltip title="Cancel Contract" arrow placement="top">
              //         <CancelPresentationOutlinedIcon />
              //       </Tooltip>)}
              //     </IconButton>
              //   ),
              // },
              // {
              //   component: (row) => (
              //     <IconButton onClick={() => handleEndContractDialog(row)}>
              //       {row.status === 4 || row.status===0 ? (
              //         setIsCotractColsed(true)
              //       ) : (
              //         <Tooltip
              //           title={getTranslation(
              //             "End Contract",
              //             "Fin du contrat",
              //             "Vertrag beenden"
              //           )}
              //           arrow
              //           placement="top"
              //         >
              //           <ExitToAppOutlinedIcon />
              //         </Tooltip>
              //       )}
              //     </IconButton>
              //   ),
              // },
            ]}
            viewSearch
            // viewEdit
            // onEdit={onEdit}
            onSearch={(searchString) => handleSearchDetails(searchString)}
          />
        </CardContent>
      </Card>

      <StartContractDialog
        buildings={buildingList}
        tenantId={tenantId}
        isOpen={openStartContractDialog}
        onClose={() => {
          setOpenStartContractDialog(false);
        }}
        onSubmit={startTenantContract}
      />

      <EndContractDialog
        isOpen={openEndContractDialog}
        endContractId={endContractId?.row?.id}
        date={endContractId?.type=="start"? endContractId?.row?.startDate:endContractId?.row?.endDate}
        type={endContractId?.type}
        onClose={() => setOpenEndContractDialog(false)}
        onSubmit={(values, actions) => changeContractDate(values, actions)}
      />
      <UpdateContractDialog
        isOpen={updateContractDialogOpen}
        onClose={() => setUpdateContractDialogOpen(false)}
        onSubmit={handleUpdateContract}
        contractId={contract?.id}
        currentAmount={contract?.currentRent}
      />
    </>
  );
};
