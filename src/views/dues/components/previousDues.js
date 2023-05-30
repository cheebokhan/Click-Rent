import React from "react";
import Table from "../../../components/table";
import { useState, useEffect } from "react";
import { DownloadFile, Get, Post } from "../../../actions";
import { useSnackbar } from "notistack";
import {
  Get_AllPreviousDuesWithPagination_URL,
  Post_UpdateDue_URL,
} from "../../../constants/apiUrls";
import { UpdateDuesDialog } from "./updateDuesDialog";
import { Card, CardContent, CardHeader, Tooltip, Typography } from "@material-ui/core";
import { getTranslation } from "../../../heplers/translationHelper";
import { DownloadButton } from "../../../components/ButttonsWithIcons";
import { Helmet } from "react-helmet";

const columns = [
  {
    id: "date",
    numeric: true,
    format: "date",
    disablePadding: true,
    label: getTranslation("Date","Date","Datum"),
  },
  {
    id: "name",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Name","Nom","Name"),
  },
  {
    id: "categoryText",
    label: getTranslation("Activity","Activité","Aktivität"),
    component: ({ row }) => (
      <Typography>
        {row.categoryText &&
          row.categoryText
            .replace("Rent- Due", getTranslation("Rent-Due", "Rent-Due", "Rent-Due"))
            .replace("Warranty- Payment", getTranslation("Warranty-Payment", "Warranty-Payment", "Warranty-Payment"))
            .replace("Rent- Payment", getTranslation("Rent-Payment", "Rent-Payment", "Rent-Payment"))
            .replace("Repair & Maintenance- Payment", getTranslation("Repair & Maintenance-Payment", "Repair & Maintenance-Payment", "Repair & Maintenance-Payment"))
            .replace("Repair & Maintenance- Due", getTranslation("Repair & Maintenance-Due", "Repair & Maintenance-Due", "Repair & Maintenance-Due"))
            .replace("Cost- Due", getTranslation("Cost-Due", "Cost-Due", "Cost-Due"))
            }
      </Typography>
    )
  },
  {
    id: "buildingName",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Building", "Immeubles", "Immobilien"),
  },
  {
    id: "appartmentNo",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Apartments", "Logements", "Wohnungen"),
  },

  {
    id: "comments",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Comments","commentaires","Kommentare"),
  },

  {
    id: "amount",
    align: "right",
    numeric: true,
    label: getTranslation("Amount","Montant","Menge"),
    format: "number",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Actions", "Actions", "Aktions"),
    align: "right",
  },
];

export const PreviousDues = () => {
  const [previousDues, setPreviousDues] = useState([]);
  const [previousDuesLoading, setPreviousDuesLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(0);
  const localSize = localStorage.getItem("sizePrevDue")
  const [rowsPerPage, setRowsPerPage] = useState(localSize?localSize:10 );
  const [due, setDue] = useState();
  const [updateDuesDialogOpen, setUpdateDueDialogOpen] = useState(false);
  const [sort, setSort] = useState("name");
  const [sortDirection, setSortDirection] = useState(1);
  useEffect(() => {}, [page, rowsPerPage, searchString]);

  /////////////////// get Previous Dues ////////////////
  useEffect(() => {
    loadPreviousDues();
  }, [page, rowsPerPage, searchString,sort,sortDirection]);
  const loadPreviousDues = (values) => {
    setPreviousDuesLoading(true);

    Get(
      {
        searchString: searchString,
        pageNumber: page,
        pageSize: rowsPerPage,
        sort:sort,
        sortDirection:sortDirection
      },
      Get_AllPreviousDuesWithPagination_URL,
      null,
      (resp) => {
        setPreviousDuesLoading(false);

        setPreviousDues(resp?.data);
      },
      (error) => {
        enqueueSnackbar(error?.data, { variant: "error" });
      }
    );
  };

  const handleUpdateDues = (values, actions) => {
    actions.setSubmitting(true);
    Post(
      values,
      Post_UpdateDue_URL,
      null,
      (resp) => {
        actions.setSubmitting(false);
        setUpdateDueDialogOpen(false);
        enqueueSnackbar("Dues Updated", { variant: "success" });
        loadPreviousDues();
      },
      (error) => {
        actions.setSubmitting(false);
      }
    );
  };
  //handlers

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem("sizePrevDue", parseInt(event.target.value));
    setRowsPerPage(localStorage.getItem("sizePrevDue"));
    setPage(0);
  };

  //handleSearchdue
  const handleSearchDue = (searchString) => {
    setSearchString(searchString);
  };

  return (
    <>
     <Helmet>
        <title>
        {getTranslation("Previous Dues", "Previous Dues", "Previous Dues")}
        </title>
      </Helmet>
    <Card>
      <CardHeader title={getTranslation("Previous Dues","Cotisations précédentes","Frühere Gebühren")} />
      <CardContent>
        <Table
          loading={previousDuesLoading}
          dense
          colums={columns}
          sortBy="name"
          sortDirection="desc"
          onSorting={(property, direction) => {
            setSort(property);
            setSortDirection(direction === "asc" ? 0 : 1);
          }}
          rows={previousDues?.data}
          count={previousDues.totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          viewSearch
          onSearch={(searchString) => handleSearchDue(searchString)}
          actions={[
            {
              component: (row) => ( row.pdfDocumentId!=null?
                <Tooltip
                  title={getTranslation("Note", "Noter", "Notiz")}
                  arrow
                  placement="top"
                >
                  <DownloadButton onClick={()=>DownloadFile(row?.pdfDocumentId)}/>
                </Tooltip>:null
              ),
            },
          ]}
        />
      </CardContent>
    </Card>
    </>

  );
};
