import React, { useState, useEffect, useRef } from "react";
import { EditButton } from "../../../components/ButttonsWithIcons";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ReportSingleIcon, ReportAllIcon } from "../../../components/icons";
import { AllBuildingsReport, BuildingReport } from "./reports";
import { DateIntervalDialog } from "../../../components/DateIntervalDialog";
import { Get, Post } from "../../../actions";
import {
  Get_AllBuildingsReport_URL,
  Get_BuildingReport_URL,
  UpdateBuildingStatus,
} from "../../../constants/apiUrls";
import { useSnackbar } from "notistack";
import { useReactToPrint } from "react-to-print";
import { getTranslation } from "../../../heplers/translationHelper";
import Table from "../../../components/table";
import Switch from "../../../components/Switch";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { FiberManualRecord } from "@material-ui/icons";

const columns = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: getTranslation(" Name ", " Nom ", " Name "),
  },
  {
    id: "totalApartments",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Apartments", "Logements", "Wohnungen"),
    component:({row})=>{
      
      return<>
        <Typography style={{ fontSize: "10px" }}>
          {getTranslation("Occupied","Occupied","Occupied")}:&nbsp;&nbsp;<strong style={{ color: "#42c963", fontSize: "12px" }}>{row?.totalOccupiedApartments}</strong></Typography>
          <Typography style={{ fontSize: "10px" }}>
          {getTranslation("Reserved","Reserved","Reserved")}:&nbsp;&nbsp;<strong style={{ color: "#f57676", fontSize: "12px" }}>{row?.totalReservedApartments}</strong></Typography>
        <Typography style={{ fontSize: "10px" }}>
          {getTranslation("Available","Available","Available")}:&nbsp;&nbsp;&nbsp;<strong style={{ color: "red", fontSize: "12px" }}>{row?.totalAvailableApartments}</strong></Typography>
      </>
    }
  },
  {
    id: "totalCost",
    disablePadding: true,
    format: "number",
    label: getTranslation("Expenses", "Expenses", "Expenses"),
    align:"right"
  },
  {
    id: "rentPaid",
    disablePadding: true,
    format: "number",
    label: getTranslation("Rent Paid", "Loyers payé", "Miete bezahlt"),
    align:"right"
  },
  {
    id: "profit",
    disablePadding: true,
    format: "number",
    label: getTranslation("Profit", "Profit", "Profitieren"),
    align:"right"
  },

  {
    id: "actions",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Action", "Action", "Aktion"),
    align: "right",
  },
];

const Buildings = ({
  loading,
  rows,
  onStatusChanged,
  onFilter,
  onBuildingSelect,
  onEdit,
  onCreate,
}) => {
  const [searchString, setSearchString] = useState("");

  const [page, setPage] = useState(0);
  const pageSize=localStorage.getItem("size");
  
  const [rowsPerPage, setRowsPerPage] = useState(pageSize?pageSize:10);
  const [dateInterval, setDateInterval] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportModel, setReportModel] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [buildingId, setBuildingId] = useState();
  const [status, setStatus] = useState("all");

  const componentBuildingReport = useRef();
  const componentAllBuildingsReport = useRef();

  useEffect(() => {
    onFilter({
      searchString,
      pageNumber: page,
      pageSize: rowsPerPage,
      status:status
    });
  }, [page, searchString, rowsPerPage,status]);
  const handlePrintBuildingReport = useReactToPrint({
    documentTitle: getTranslation(
      "Building Report",
      "Building Report",
      "Building Report"
    ),
    content: () => componentBuildingReport.current,
  });
  const handlePrintAllBuildingsReport = useReactToPrint({
    documentTitle: getTranslation(
      "All Building Report",
      "All Building Report",
      "All Building Report"
    ),
    content: () => componentAllBuildingsReport.current,
  });

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem("size", parseInt(event.target.value));
    setRowsPerPage(localStorage.getItem("size"));
    setPage(0);
  };

  const handleSearchBuilding = (searchString) => {
    setSearchString(searchString);
  };

  const handleSubmitDateInterval = (values, actions) => {
    Get(
      { buildingId: buildingId, to: values.endDate, from: values.startDate,status:status },
      reportType === "all"
        ? Get_AllBuildingsReport_URL
        : Get_BuildingReport_URL,
      null,
      (resp) => {
        setReportModel(resp?.data != null ? resp?.data : " ");
        setDateInterval(false);

        if (reportType === "solo") handlePrintBuildingReport();
        else if (reportType === "all") handlePrintAllBuildingsReport();
        actions.setSubmitting(false);
      },
      (error) => {
        enqueueSnackbar(error?.data, { variant: "error" });
        actions.setSubmitting(false);
      }
    );
  };

  return (
    <div>
      <Card>
        <CardHeader
          title={getTranslation("Buildings", "Immeubles", "Immobilien")}
        />
        <CardContent>
        <ToggleButtonGroup
          size="small"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          id="tenantStatus"
          //defaultChecked={tenantStatus}
          value={status}
          exclusive
          onChange={(event, status) => {
            if (status !== null) {
              setStatus(status);
            }
          }}
        >
          <ToggleButton value={"all"} aria-label="centered" >
            <Typography>{getTranslation("All","Tout","Alle")}</Typography>
          </ToggleButton>
          <ToggleButton value={"active"} aria-label="left aligned">
            <Typography>{getTranslation("active","actif","aktiv")}</Typography>
          </ToggleButton>
          <ToggleButton value={"inactive"} aria-label="centered">
            <Typography>{getTranslation("inactive","inactif","inaktiv")}</Typography>
          </ToggleButton>
          
        </ToggleButtonGroup>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              margin: "15px",
            }}
          >
            <Tooltip
              title={getTranslation(
                "Generate all buildings report",
                "G�n�rer le rapport de tous les b�timents",
                "Erstellen Sie einen Bericht �ber alle Geb�ude"
              )}
              arrow
              placement="left-start"
            >
              <IconButton
                onClick={() => {
                  setReportType("all");
                  setDateInterval(true);
                }}
              >
                <ReportAllIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Table
            dense
            //title="Buildings"
            loading={loading}
            colums={columns}
            sortBy="name"
            sortDirection="asc"
            rows={rows?.data}
            count={rows?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            viewEdit
            onEdit={(row) => onBuildingSelect(row)}
            actions={[
              {
                component: (rowData) => onStatusChanged(rowData),
              },
              {
                component: (rowData) => (
                  <Tooltip
                    title={getTranslation(
                      "Generate Building Report",
                      "G�n�rer un rapport de construction",
                      "Geb�udebericht erstellen"
                    )}
                    arrow
                    placement="left-start"
                  >
                    <IconButton
                      onClick={() => {
                        setReportType("solo");
                        setDateInterval(true);
                        setBuildingId(rowData.id);
                      }}
                    >
                      <ReportSingleIcon />
                    </IconButton>
                  </Tooltip>
                ),
              },
              {
                component: (rowData) => (
                  <Tooltip
                    title={getTranslation(
                      "Edit building",
                      "Modifier le b�timent",
                      "Geb�ude bearbeiten"
                    )}
                    arrow
                    placement="top"
                  >
                    <IconButton
                      onClick={() => {
                        onEdit(rowData);
                      }}
                    >
                      <EditButton />
                    </IconButton>
                  </Tooltip>
                ),
              },
            ]}
            viewSearch
            onSearch={(searchString) => handleSearchBuilding(searchString)}
            viewCreate
            onCreate={onCreate}
          />
          <div display="none">
            <DateIntervalDialog
              onSubmit={(values, actions) => {
                handleSubmitDateInterval(values, actions);
              }}
              isOpen={dateInterval}
              onClose={() => setDateInterval(false)}
            />
          </div>
          <div style={{ display: "none" }}>
            <Report
              type={reportType}
              model={reportModel}
              ref={
                reportType === "solo"
                  ? componentBuildingReport
                  : componentAllBuildingsReport
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Buildings;

const Report = React.forwardRef(({ type, model }, ref) => {
  if (type === "solo") {
    return <BuildingReport rows={model} ref={ref} />;
  } else if (type === "all") {
    return <AllBuildingsReport rows={model} ref={ref} />;
  } else {
    return null;
  }
});
