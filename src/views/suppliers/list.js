import { AddSupplierDialog, Suppliers } from "./component";
import React, { useState, useEffect } from "react";
import {
  Get_AllSupplierCategories_URL,
  Get_GetAllSuppliersWithPagination_URL,
  Post_InsertSupplier_URL,
  Post_UpdateSupplier_URL,
} from "../../constants/apiUrls";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { Get, Post } from "../../actions";
import { useDispatch } from "react-redux";
//state management
const List = () => {
  const [supplierList, setSupplierList] = useState();
  const [supplierListLoading, setSupplierListLoading] = useState(false);
  const [addSupplierDialog, setAddSupplierDialog] = useState(false);
  const history = useHistory();
  const [editSupplier, setEditSupplier] = useState(null);
  const [supplierCategories, setSupplierCategories] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const [filterItems, setFilterItems] = useState({
    searchString: "",
    pageNumber: 0,
    pageSize: 10,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    loadSuppliers(filterItems);
  }, [filterItems]);
  const loadSuppliers = (values) => {
    setSupplierListLoading(true);
    setFilterItems(values);
    Get(
      values,
      Get_GetAllSuppliersWithPagination_URL,
      history,
      (resp) => {
        setSupplierListLoading(false);
        setSupplierList(resp?.data);
      },
      (error) => {
        setSupplierListLoading(false);
        enqueueSnackbar("Can't Load Supplier List! Internal server error", {
          variant: "error",
        });
      }
    );
  };
  useEffect(() => {
    dispatch({ type: "Clear_All_BreadCrumb" });
    dispatch({
      type: "Add_BreadCrumb",
      payload: { title: "Suppliers", url: "/supplier" },
    });
  }, []);

  
  useEffect(() => {
    Get(
      { },
      Get_AllSupplierCategories_URL,
      null,
      (resp) => {
        setSupplierCategories(resp.data);
      },
      (error) => {}
    );
 }, []);
  ////////////////////////////////////// POST Suppliers ////////////////////////////////////

  
  const submitSupplier = async (values, actions) => {
    await Post(
      values,
      editSupplier ? Post_UpdateSupplier_URL : Post_InsertSupplier_URL,
      history,
      (resp) => {
        setAddSupplierDialog(false);
        actions.setSubmitting(false);
        loadSuppliers(filterItems);
        enqueueSnackbar(editSupplier ? "Supplier information updated":"New supplier information added", { variant: "success", });
        setEditSupplier(null);
      },
      (error) => {
        setAddSupplierDialog(false);
        actions.setSubmitting(false);
        enqueueSnackbar("Can't Add supplier! Internal server error", {
          variant: "error",
        });
        loadSuppliers();
      }
    );
  };

  const hanldeOnEditSupplier = (supplier) => {
    setAddSupplierDialog(true);
    setEditSupplier(supplier);
  };
  return (
    <div>
      <Suppliers
        loading={supplierListLoading}
        rows={supplierList}
        onFilter={(values) => loadSuppliers(values)}
        onEdit={hanldeOnEditSupplier}
        onCreate={() => setAddSupplierDialog(true)}
      />
      <AddSupplierDialog
        isOpen={addSupplierDialog}
        onClose={() =>{ setAddSupplierDialog(false); setEditSupplier(null)}}
        onSubmit={submitSupplier}
        supplier={editSupplier}
        enableEdit={editSupplier !== null}
        supplierCategories={supplierCategories}
      />
    </div>
  );
};
export default List;
