import { AddDue, Dues } from "./components";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import {
  Get_AllDuesWithPagination_URL,
  Post_InsertTenantDue_URL,
  Get_AllTanenets_URL,
  Post_ConfirmDues_URL,
  Post_UpdateDue_URL,
  Get_AllSuppliers_Url,
  Post_InsertSupplierDue_URL,
  Get_AllBuildings_URL,
} from "../../constants/apiUrls";
import { Get, Post } from "../../actions/apiActions";
import ButtonWithLoading from "../../components/ButtonWithLoading";
import { Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { UpdateDuesDialog } from "./components/updateDuesDialog";
import { getTranslation } from "../../heplers/translationHelper";

//state management

const List = () => {
  const [dueList, setDueList] = useState([]);
  const [editDue, setEditDue] = useState();
  const [duesLoading, setDuesLoadign] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [tanentList, setTanentList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const dispatch = useDispatch();

  const [addDuesDialog, setAddDuesDialog] = useState(false);
  const [updateDuesDialogOpen, setUpdateDueDialogOpen] = useState(false);
  const [due, setDue] = useState();
  const pageSize=localStorage.getItem("sizeDues");
  const [buildings, setBuildings] = useState([]);

  const [filterItems, setFilterItems] = useState({
    searchString: "",
    pageNumber: 0,
    pageSize: pageSize?pageSize:10,
  });

  /////////////// Update Due /////////////////////

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
        loadDues(filterItems);
      },
      (error) => {
        actions.setSubmitting(false);
      }
    );
  };

  useEffect(() => {
    dispatch({ type: "Clear_All_BreadCrumb" });
    dispatch({
      type: "Add_BreadCrumb",
      payload: {
        title: getTranslation(" Dues ", " Locataires ", " Mieter "),
        url: "/dues",
      },
    });
    // dispatch({ type: CLEAR_SUB_MENU })
  }, []);

  /////////////////////////////// POST ///////////////////////////

  const submitDues = (values, actions) => {
    console.log("ajklsdhkasjd",values)
    Post(
      values,
      editDue
        ? Post_UpdateDue_URL
        : values?.inputMode === 0
        ? Post_InsertTenantDue_URL
        : Post_InsertSupplierDue_URL,
      history,
      (resp) => {
        actions.setSubmitting(false);
        enqueueSnackbar("Dues Submitted", { variant: "success" });
        setAddDuesDialog(false);
        loadDues(filterItems);
        if (editDue) {
          setEditDue(null);
        }

       
      },
      (error) => {
        actions.setSubmitting(false);
        setAddDuesDialog(false);
        enqueueSnackbar("No contract is exist of tenant", {
          variant: "error",
        });
        loadDues(filterItems);
      }
    );
  };

  /////////////////////////////////////////// GET Tanents ////////////////////////////

  useEffect(() => {
    loadTanenets();
  }, []);

  ////////////////////////////////////

  const loadTanenets = (values) => {
    Get(
      values,
      Get_AllTanenets_URL,
      history,
      (resp) => {
        setTanentList(resp?.data);
      },
      (error) => {
        enqueueSnackbar("Internal server Error! Can't Load Tanents", {
          variant: "error",
        });
      }
    );
  };

  /////////////////////////////////////////// GET Supplier ////////////////////////////

  useEffect(() => {
    loadSupplier();
    loadBuildings();
  }, []);

  const loadSupplier = (values) => {
    Get(
      values,
      Get_AllSuppliers_Url,
      history,
      (resp) => {
        setSupplierList(resp?.data);
      },
      (error) => {
        enqueueSnackbar("Internal server Error! Can't Load Supplier", {
          variant: "error",
        });
      }
    );
  };

  useEffect(() => {
    loadDues(filterItems);
  }, [filterItems]);
  const loadDues = (values) => {
    setDuesLoadign(true);
    Get(
      values,
      Get_AllDuesWithPagination_URL,
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

  const generateDue = () => {
    setSubmitting(true);
    Post(
      {},
      Post_ConfirmDues_URL,
      history,
      (resp) => {
        enqueueSnackbar("Due Generated", { variant: "success" });
        setSubmitting(false);
        loadDues(filterItems);
      },
      (error) => {
        enqueueSnackbar("Something went wrong", { variant: "error" });
        setSubmitting(false);
      }
    );
  };

  const onEdit = (row) => {
    setDue(row);
    setUpdateDueDialogOpen(true);
  };

  const loadBuildings=()=>{
    Get(
      {},
      Get_AllBuildings_URL,
      null,
      resp=>{
        setBuildings(resp?.data)
      },
      error=>{

      }
    )
  }

  return (
    <div>
      <Dues
        loading={duesLoading}
        rows={dueList}
        onFilter={(values) => loadDues(values)}
        onEdit={onEdit}
        onCreate={() => setAddDuesDialog(true)}
      />
      <UpdateDuesDialog
        isOpen={updateDuesDialogOpen}
        onClose={() => setUpdateDueDialogOpen(false)}
        onSubmit={handleUpdateDues}
        dueId={due?.id}
        dueDate={due?.date}
        currentAmount={due?.amount}
        comments={due?.comments}
        pdfDocumentId={due?.pdfDocumentId}
      />
      <br />
      <Box
        pr={1}
        pb={1}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-center"
      >
        <ButtonWithLoading
          style={{ margin: "0 auto", display: "flex" }}
          title={getTranslation("Confirm", "Confirmer", "Best�tigen Sie")}
          size="large"
          variant="contained"
          color="primary"
          loading={isSubmitting}
          onClick={generateDue}
        />
      </Box>

      <AddDue
        isOpen={addDuesDialog}
        onClose={() => setAddDuesDialog(false)}
        onSubmit={submitDues}
        tanents={tanentList}
        due={editDue}
        suppliers={supplierList}
        buildings={buildings}
      />
    </div>
  );
};
export default List;
