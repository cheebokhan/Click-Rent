import React from "react";
import Table from "../../../components/table";
import { useState, useEffect, useRef } from "react";
import {
  DeleteButton,
  EditButton,
  PrintButton,
  ReminderButton,
  SendSMSButton,
} from "../../../components/ButttonsWithIcons";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import PrintIcon from '@material-ui/icons/Print';
import { ReminderTemplateDialog } from "./reminderTemplateDialog";
import { getTranslation } from "../../../heplers/translationHelper";
/////...imports for print..../////

import {
  Get_SuppliersReport_URL,
  Get_SendManualReminders_URL,
  Get_AllFundActivitiesWithPagination_URL,
  Delete_Tenant_URL,
} from "../../../constants/apiUrls";
import { useReactToPrint } from "react-to-print";
import { DateIntervalDialog } from "../../../components/DateIntervalDialog";
import { useSnackbar } from "notistack";
import { AllTenantReport } from "./reports";
import { ReportAllIcon } from "../../../components/icons";
import { Get, Post } from "../../../actions";
import { format } from "../../../heplers/format";
import MailIcon from '@material-ui/icons/Mail';
import { DeleteOutline, DeleteSharp, Print } from "@material-ui/icons";
import { SMSReminderTemplateDialog } from "./smsReminderTemplateDialog";
import { PrintDialog } from "./details/components";
import ButtonWithLoading from "../../../components/ButtonWithLoading";
//name, address, zipcode, Town
const columns = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Name", "Nom", "Name"),
  },
  {
    id: "apartmentNo",
    label: getTranslation("Appartment", "Appartement", "Wohnung"),
    format: "left",
  },
  {
    id: "lastPaymentDate",
    label: getTranslation("Last Payment", "Dernier payment", "Letzte Zahlung"),
    format: "date",
    component: ({ row }) => {
      if (row.isPaymentDoneInLastMonth == false) {
        return <Typography style={{ color: 'red' }}>{format("date", row.lastPaymentDate)}</Typography>
      }
      return <Typography style={{ color: 'green' }}>{format("date", row.lastPaymentDate)}</Typography>
    }
  },
  {
    id: "accountBalance",
    label: getTranslation("Balance", "Solde", "Saldo"),
    format: "number",
    align: "right",
  },
  {
    id: "telephone",
    label: getTranslation("Phone", "Phone", "Phone"),
    format: "number",
    align: "right",
  },

  {
    id: "actions",
    label: getTranslation("Action", "Action", "Action"),
    align: "right",
  },
];

const onHold = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Name", "Nom", "Name"),
  },
  {
    id: "startDate",
    label: getTranslation("Start Date", "Date de début", "Anfangsdatum"),
    format: "date"
  },
  {
    id: "apartmentNo",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Appartment", "Appartement", "Wohnung"),
  },
  {
    id: "buildingName",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Building", "Imeuble", "Gebäude"),
  },
  {
    id: "statusText",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Status", "Statut", "Status"),
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Actions", "Actions", "Aktionen"),
  },
];

const Tanents = ({
  loading,
  printLoader,
  rows,
  onSendReminder,
  onFilter,
  sendManually,
  onTenantChange,
  onCreate,
  onEditTenant,
  onPrint,
  onRefresh
}) => {
  const [tenantStatus, setTenantStatus] = useState("active");
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(0);
  let pageSize = localStorage.getItem("sizeTent");
  if (pageSize == null) {
    localStorage.setItem("sizeTent", 10)
    pageSize = 10
  }
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [manualSending, setManualSending] = useState(false);
  const [sendReminderDialog, setSendReminderDialog] = useState(false);
  const [sendSMSReminderDialog, setSendSMSReminderDialog] = useState(false);
  const [sendPostReminderDialog, setSendPostReminderDialog] = useState(false);
  const [reminderTenant, setReminderTenant] = useState();
  const [sortDirection,setSortDirecion]=useState('asc');
  const [sortBy,setSortBy]=useState('name');
  const { enqueueSnackbar } = useSnackbar();

  const [reportModel, setReportModel] = useState();

  const [dateInterval, setDateInterval] = useState(false);
  const componentRef = useRef();
  const sendByPostRef = useRef();

  const handlePrintSupplierReport = useReactToPrint({
    documentTitle: getTranslation(
      " Invitation ",
      " Invitation ",
      " Einladung "
    ),
    content: () => componentRef.current,
  });

  useEffect(() => {
    onFilter({
      pageNumber: page,
      pageSize: rowsPerPage,
      status: tenantStatus,
      sortDirection:sortDirection=='asc' ? 0 : 1,
      sort:sortBy,
      searchString:searchString,
    
    });
  }, [page, searchString, rowsPerPage, tenantStatus, sortDirection, sortBy]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem("sizeTent", parseInt(event.target.value));
    setRowsPerPage(localStorage.getItem("sizeTent"));
    setPage(0);
  };

  const handleSearchTanents = (searchString) => {
    setSearchString(searchString);
  };

  const handleSendReminder = (row) => {
    setManualSending(true);
    setSendReminderDialog(true);
    setReminderTenant(row);
    // setIsReminderSending(true);
    // onSendReminder(row, () => {
    //   setIsReminderSending(false);
    // });
  };

  const handleSendSMSReminder = (row) => {
    setSendSMSReminderDialog(true);
    setReminderTenant(row);
  };

  const handleSendPostReminder = (row) => {
    setSendPostReminderDialog(true)
    setReminderTenant(row);
    loadDues(row);
  };

  /////....This is all tenant report section start...//////

  const handleSubmitDateInterval = (values, actions) => {
    Get(
      { to: values.endDate, from: values.startDate },
      Get_SuppliersReport_URL,
      null,
      (resp) => {
        setReportModel(resp?.data);
        setDateInterval(false);
        handlePrintSupplierReport();
        actions.setSubmitting(false);
      },
      (error) => {
        enqueueSnackbar(error?.data, { variant: "error" });
        actions.setSubmitting(false);
      }
    );
  };

  /////....This is all tenant report section ends...//////

  const SendMenualReminder = (values, actions) => {
    Get(
      values,
      Get_SendManualReminders_URL,
      null,
      (resp) => {
        enqueueSnackbar("Reminders sent", { variant: "success" });
      },
      (error) => {
        enqueueSnackbar(error?.data, { variant: "error" });
      }
    );
  };

   ///////////////// load Dues /////////////////////////
  const [dueList, setDueList] = useState([]);
  const [sendByPostMessage, setSendByPostMessage] = useState("");

   const loadDues = (row) => {
    // setDuesLoadign(true);
    Get(
      {tenantId:row.id},
      Get_AllFundActivitiesWithPagination_URL,
      null,
      (resp) => {
        // setSendPostReminderDialog(true);
        // setDuesLoadign(false);
        setDueList(resp?.data);
        
      },
      (error) => {
        enqueueSnackbar("Internal server Error", { variant: "error" });
      }
    );
  };

  const [deleting,setDeleting]=useState(null);

   const handleDeleteTenant = (row) => {
    // setDuesLoadign(true);
    setDeleting(row)
    Get(
      {tenantId:row.id},
      Delete_Tenant_URL,
      null,
      (resp) => {
        // setSendPostReminderDialog(true);
        // setDuesLoadign(false);
        // setDueList(resp?.data);
        setDeleting(null);
        if(onRefresh)
        onRefresh();
        enqueueSnackbar("Tenant deleted.", { variant: "success" });
        
      },
      (error) => {
        setDeleting(null);

        enqueueSnackbar(getTranslation(error?.data,error?.data,error?.data), { variant: "error" });
      }
    );
  };

  const handlePrint = useReactToPrint({
    documentTitle: getTranslation("Tenant Report","Tenant Report","Tenant Report"),
    content: () => sendByPostRef.current,
  });

  return (
    <Card>
      <CardHeader title={getTranslation("Tenants", "Locataires", "Mieter")} />
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
          value={tenantStatus}
          exclusive
          onChange={(event, tenantStatus) => {
            if (tenantStatus !== null) {
              setTenantStatus(tenantStatus);
            }
          }}
        >
          <ToggleButton value={"active"} aria-label="left aligned">
            <Typography>{getTranslation("active", "actif", "aktiv")}</Typography>
          </ToggleButton>
          <ToggleButton value={"inactive"} aria-label="centered">
            <Typography>{getTranslation("inactive", "inactif", "inaktiv")}</Typography>
          </ToggleButton>
          <ToggleButton value={"onhold"} aria-label="centered">
            <Typography>{getTranslation("On Hold", "En attente", "In Wartestellung")}</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <Box
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginBottom:"1.5rem"
          }}
        >
           <ButtonWithLoading 
          onClick={() => onPrint()}
            variant="contained"
             color='primary' 
             title={<> <Print/> &nbsp;&nbsp; { getTranslation("Print", "Print", "Print")}</>}
              size="medium" loading={printLoader} />
          &nbsp;&nbsp;
          <Button onClick={() => SendMenualReminder()} variant="contained" color='primary'>
            <MailIcon />&nbsp;&nbsp; {getTranslation("Send Reminders", "Send Reminders", "Send Reminders")}
          </Button>
        </Box>
        <Table
        loading={loading}
        dense
        colums={tenantStatus === "onhold" ? onHold : columns}
        sortBy={sortBy}
        onSorting={(sort,direction)=>{
          setSortBy(sort);
          setSortDirecion(direction);
        }}
        sortDirection={sortDirection}
        rows={rows?.data}
        count={rows?.totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        viewEdit
        onEdit={(row) => onTenantChange(row)}
        viewSearch
        viewCreate
        onCreate={onCreate}
        onSearch={(searchString) => handleSearchTanents(searchString)}
        actions={[
          {
            component: (row) => (
              <>
                {row.status === "onhold" || row.status === "inactive" ? (
                  <EditButton onClick={() => onEditTenant(row)} />
                ) : null}
              </>
            ),
          },

          {
            component: (row) => (
              <ReminderButton onClick={() => handleSendReminder(row)} />
            ),
          },
          {
            component: (row) => (
              <SendSMSButton onClick={() => handleSendSMSReminder(row)} />

            ),
          },
          {
            component: (row) => (
              deleting && deleting?.id==row.id ?
              <CircularProgress size="24px"/>
              :

              <IconButton size="small"
              variant="contained"
              onClick={()=>handleDeleteTenant(row)}
              >
                <DeleteSharp />
                </IconButton>
              // <DeleteButton onClick={() => handleSendSMSReminder(row)} />

            ),
          },
          
          // {
          //   component: (row) => (
          //     <IconButton
          //       onClick={() => handleSendPostReminder(row)}
          //       size="small"
          //       variant="contained">
          //       <PrintIcon />
          //     </IconButton>
          //   ),
          // },
        ]}
      />

        {/* ////.....Report starts here ....//// */}
        <div display="none">
          <DateIntervalDialog
            isOpen={dateInterval}
            onSubmit={(values, actions) => {
              handleSubmitDateInterval(values, actions);
            }}
            onClose={() => setDateInterval(false)}
          />
        </div>
        <div style={{ display: "none" }}>
          <Report ref={componentRef} model={reportModel} />
        </div>

        <div style={{ display: "none" }}>
          <PrintDialog sendByPost message={sendByPostMessage} tenant={reminderTenant} rows={dueList} ref={sendByPostRef} model={reportModel} />
        </div>
        {/* ////.....Report ends here ....//// */}

        <div>
          <ReminderTemplateDialog
            isOpen={sendReminderDialog || sendPostReminderDialog}
            onClose={() => {
              setSendReminderDialog(false)
              setSendPostReminderDialog(false)
            }}
            sendManually={manualSending}
            reminderToTenant={reminderTenant}
            sendByPost={sendPostReminderDialog}

          />
        </div>
        <div>
          <SMSReminderTemplateDialog
            isOpen={sendSMSReminderDialog}
            onClose={() => {
              setSendSMSReminderDialog(false)
            }}
            sendManually={manualSending}
            reminderToTenant={reminderTenant}
            onSubmit={(message)=>{
              setSendByPostMessage(message)
              handlePrint();
              setSendPostReminderDialog(false)
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default Tanents;

const Report = React.forwardRef(({ model }, ref) => {
  return <AllTenantReport data={model} ref={ref} />;
});
