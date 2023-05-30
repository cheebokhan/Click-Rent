import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  TextField,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { DownloadButton, EditButton } from "../../../components/ButttonsWithIcons";

import Table from "../../../components/table";
import { useState, useEffect } from "react";
import DeleteDialog from "../../../components/DeleteDialog";
import {
  Post_AddNote_URL,
  Post_DeleteDue_URL,
  Get_AllDuesWithPagination_URL,
  Get_AllBuildings_URL,
} from "../../../constants/apiUrls";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CommentsIcon, ReportSingleIcon } from "../../../components/icons";

import { DownloadFile, Get, Post } from "../../../actions/apiActions";
import { getTranslation } from "../../../heplers/translationHelper";
import { AddNoteDue } from "./noteDuesDialog";
import { string } from "yup";
import { FontDownloadRounded } from "@material-ui/icons";
import { Helmet } from "react-helmet";
//name, address, zipcode, Town
const columns = [
  {
    id: "date",
    disablePadding: true,
    label: getTranslation("Date","Date","Datum"),
    format:"date"
  },
  {
    id: "name",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Name","Nom","Name"),
  },
  {
    id: "categoryText",
    numeric: true,
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
    id: "paymentAmount",
    format: "number",
    align: "right",
    label: getTranslation("Payment","Paiement","Zahlung"),
  },
  {
    id: "dueAmount",
    format: "number",
    align: "right",
    label: getTranslation("Due","Exigible","Fällig"),
  },
  {
    id: "comments",
    label: getTranslation("Comments","Comments","Comments"),
    component:({row})=>{
     return<> {row.comments?.split(/\r?\n/).map(item => {
      return <Typography>{item}</Typography>
        
      })}
      </>
    }
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: true,
    label: getTranslation("Actions", "Actions", "Aktions"),
    align: "right",
  },
];

const Dues = ({ loading, rows, onCreate, onFilter, onEdit }) => {
  const [searchString, setSearchString] = useState("");
  const [sort, setSort] = useState("date");
  const [sortDirection, setSortDirection] = useState(1);

  const [page, setPage] = useState(0);
  const pageSize=localStorage.getItem("sizeDues");

  const [rowsPerPage, setRowsPerPage] = useState(
    pageSize?pageSize:10
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [deletingDues, setDeletingDues] = useState();
  const [deleteDue, setDeleteDue] = useState();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [dueId, setDueId] = useState(0);

  useEffect(()=>{
    onFilter({
      searchString,
      pageNumber: page,
      pageSize: rowsPerPage,
      sort:sort,
      sortDirection:sortDirection
    });
  },[searchString,page,rowsPerPage,sort,sortDirection])

  const handleDeleteDialog = async (row) => {
    const deleteArray = new Array();
    deleteArray.push(deleteDue.id);
    await Post(
      {
        ids: deleteArray,
      },
      Post_DeleteDue_URL,
      history,
      (resp) => {
        enqueueSnackbar("Dues deleted", { variant: "success" });
        onFilter({
          searchString,
          pageNumber: page,
          pageSize: rowsPerPage,
        });
        setOpenDelete(false);
        setDeletingDues(false);
      },
      (error) => {
        enqueueSnackbar("Can't delete dues", { variant: "Error" });
        setDeletingDues(false);
      }
    );
  };
  //// handleOpenDeleteDialog
  const handleOpenDeleteDialog = (row) => {
    setDeleteDue(row);
    setOpenDelete(true);
  };
  // handlers
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem("sizeDues", parseInt(event.target.value));
    setRowsPerPage(localStorage.getItem("sizeDues"));
    setPage(0);
  };

  // handleSearchdue
  const handleSearchDue = (searchString) => {
    setSearchString(searchString);
  };

  const hanldeOnAddNote = (row) => {
    console.log("ioqueoqie", row);
    setDueId(row.id);
    setAddNote(true);
  };

  const handleSubmitDuesNote = (values, actions) => {
    values.id = dueId;
    Post(
      values,
      Post_AddNote_URL,
      null,
      (resp) => {
        enqueueSnackbar("Note added successfully", { variant: "success" });
        setAddNote(false);
      },
      (err) => {
        enqueueSnackbar("note not addedd", { variant: "error" });
      }
    );
  };


  return (
    <>
     <Helmet>
        <title>
        {getTranslation("Dues", "Dues", "Dues")}
        </title>
      </Helmet>
    <Card>
      <CardHeader title={getTranslation("Dues", "Droits", "Gebhren")} />
      <CardContent>
          <Table
          loading={loading}
          dense
          colums={columns}
          sortBy={sort}
          sortDirection={sortDirection==0?'asc':'desc'}
          rows={rows?.data}
          count={rows?.totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={(e, newPage) => handleChangePage(newPage)}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          viewDelete
          viewCreate
          onCreate={onCreate}
          onDelete={(row) => handleOpenDeleteDialog(row)}
          onSorting={(sort,direction)=>{
            setSort(sort)
            setSortDirection(direction=='asc'?0:1)
          }}
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
          // viewCreate
          // onCreate = {()=>handleCreateDue()}
          viewSearch
          onSearch={(searchString) => handleSearchDue(searchString)}
          viewEdit
          onEdit={onEdit}
          />
       
        <AddNoteDue
          isOpen={addNote}
          onSubmit={(values, actions) => handleSubmitDuesNote(values, actions)}
          onClose={() => setAddNote(false)}
        />
        <DeleteDialog
          open={openDelete}
          deleting={deletingDues}
          title={getTranslation(
            "Delete Dues",
            "Supprimer les cotisations",
            "Geb?hren l?schen"
          )}
          onClose={() => setOpenDelete(false)}
          onSubmit={(e) => {
            setDeletingDues(true);
            handleDeleteDialog();
          }}
        />
      </CardContent>
    </Card>
    </>

  );
};
export default Dues;
