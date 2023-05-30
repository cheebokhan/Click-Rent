import React, { useState, useEffect, useRef } from "react";
import Table from "../../../components/table";
import { EditButton } from "../../../components/ButttonsWithIcons";
import AlertDialog from "../../../components/DeleteDialog";
import { Get, Post } from "../../../actions";
import {
  Get_SuppliersReport_URL,
  Post_DeleteSupplier_URL,
} from "../../../constants/apiUrls";
import { DateIntervalDialog } from "../../../components/DateIntervalDialog";
import { useSnackbar } from "notistack";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { ReportAllIcon } from "../../../components/icons";
import { useReactToPrint } from "react-to-print";
import { AllSupplierReport } from "./suppliersReprot";
import { getTranslation } from "../../../heplers/translationHelper";
import { Helmet } from "react-helmet";
//name, address, zipcode, Town
const columns = [
  {
    id: "company",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Company", "Soci�t�", "Firma"),
  },
  {
    id: "ban",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Bank Account", "Compte bancaire", "Bankkonto"),
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: true,
    label: getTranslation("Phone", "T�l�phone", "Telefon"),
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Action", "Action", "Action"),
    align: "right",
  },
];
const Suppliers = ({ loading, rows, onCreate, onFilter, onEdit }) => {
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    localStorage.getItem("sizeSupp")
  );
  const [deletedRow, setDeletedRow] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [reportModel, setReportModel] = useState();

  const [dateInterval, setDateInterval] = useState(false);
  const componentRef = useRef();

  const handlePrintSupplierReport = useReactToPrint({
    documentTitle: getTranslation(
      " Invitation ",
      " Invitation ",
      " Einladung "
    ),
    content: () => componentRef.current,
  });

  //handlers
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem("sizeSupp", parseInt(event.target.value));
    setRowsPerPage(localStorage.getItem("sizeSupp"));
    setPage(0);
  };

  //handleSearchdue
  const handleSearchSupplier = (searchString) => {
    setSearchString(searchString);
  };

  const handleDeleteSubmit = () => {
    setDeleting(true);
    Post(
      { ids: [deletedRow.id] },
      Post_DeleteSupplier_URL,
      null,
      (resp) => {
        enqueueSnackbar("Supplier is deleted.", { variant: "success" });
        setDeleting(false);
        onFilter({
          searchString,
          pageNumber: page,
          pageSize: rowsPerPage,
        });
        setOpenDeleteDialog(false);
      },
      (error) => {
        enqueueSnackbar(
          "Not able to delete. Supplier data is attached with some transactions.",
          { variant: "error" }
        );
        setOpenDeleteDialog(false);
        setDeleting(false);
      }
    );
  };

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

  useEffect(() => {
    onFilter({
      searchString,
      pageNumber: page,
      pageSize: rowsPerPage,
    });
  }, [searchString, page, rowsPerPage])
  return (
    <div>
      <Helmet>
        <title>
          {getTranslation("Supplier", "Supplier", "Supplier")}
        </title>
      </Helmet>
      <Card>
        <CardHeader
          title={getTranslation("Suppliers", "Fournisseurs", "Lieferanten")}
        />
        <CardContent>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Tooltip
              title={getTranslation(
                "Generate all suppliers report",
                "G�n�rer le rapport de tous les fournisseurs",
                "Generieren Sie alle Lieferantenberichte"
              )}
              arrow
              placement="left-start"
            >
              <IconButton
                onClick={() => {
                  setDateInterval(true);
                }}
              >
                <ReportAllIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Table
            loading={loading}
            dense
            colums={columns}
            sortBy="name"
            rows={rows?.data}
            count={rows?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            viewCreate
            onCreate={onCreate}
            actions={[
              {
                component: (rowData) => (
                  <EditButton
                    onClick={() => {
                      onEdit(rowData);
                    }}
                  />
                ),
              },
            ]}
            viewSearch
            onSearch={(searchString) => handleSearchSupplier(searchString)}
            viewDelete
            onDelete={(row) => {
              setDeletedRow(row);
              setOpenDeleteDialog(true);
            }}
          />

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
          <AlertDialog
            open={openDeleteDialog}
            deleting={deleting}
            onClose={() => setOpenDeleteDialog(false)}
            onSubmit={handleDeleteSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default Suppliers;

const Report = React.forwardRef(({ model }, ref) => {
  return <AllSupplierReport data={model} ref={ref} />;
});

//style={{display:"none"}}
