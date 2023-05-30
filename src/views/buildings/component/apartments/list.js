import { AddAppartment, Appartments } from "./components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { Get, Post } from "../../../../actions";
import { CircularProgress, Grid } from "@material-ui/core";
import {
  Get_AllAppartmentsWithPagination_URL,
  Get_Building_URL,
  Get_BuldingSummary_URL,
  Post_InsertAppartment_URL,
  Post_UpdateAppartment_URL,
} from "../../../../constants/apiUrls";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { BuildingInformation } from "./components/buildingInformation";
import { SummaryBuilding } from "./components/summaryBuilding";
import { getTranslation } from "../../../../heplers/translationHelper";
//state management
const List = () => {
  const { buildingId } = useParams();
  const history = useHistory();
  const [appartmentList, setApartmentList] = useState();
  const [buildingInformation, setBuildingInformation] = useState({});
  const [buildingSummary, setBuildingSummary] = useState({});
  const [appartmentLoading, setApartmentLoading] = useState();
  const [loadInformation, setLoadInformation] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [filterItems, setFilterItems] = useState({
    buildingId: buildingId,
    searchString: "",
    pageNumber: 0,
    pageSize: 10,
  });
  const dispatch = useDispatch();

  // useEffect(() => {
  //     //dispatch({type:"Clear_All_BreadCrumb"})
  //     dispatch({type:"Add_BreadCrumb",payload:{title:"Apartments",url:"/apartments"}})
  //   }, []);

  ////////// Get Apartments
  useEffect(() => {
    loadApartments(filterItems);
  }, [filterItems]);
  const loadApartments = (values) => {
    setApartmentLoading(true);
    setFilterItems(values);
    Get(
      values,
      Get_AllAppartmentsWithPagination_URL,
      history,
      (resp) => {
        setApartmentLoading(false);
        setApartmentList(resp?.data);
      },
      (error) => {
        setApartmentLoading(false);
        enqueueSnackbar(
          getTranslation(
            " Internal server error ",
            " Erreur interne du serveur ",
            " Interner Serverfehler "
          ),
          { variant: "error" }
        );
      }
    );
  };

  ////////// Load Building Information /////////////
  useEffect(() => {
    loadBuildingInformation(buildingId);
  }, []);

  const loadBuildingInformation = () => {
    setLoadInformation(true);
    Get(
      { buildingId: buildingId },
      Get_Building_URL,
      null,
      (resp) => {
        setLoadInformation(false);
        console.log("khdjkhjkdgsg", resp?.data);
        setBuildingInformation(resp?.data);
      },
      (error) => {
        setLoadInformation(false);
        enqueueSnackbar(
          getTranslation(
            " Unable to get Building Information ",
            " Impossible d'obtenir les informations sur le b�timent ",
            " Geb�udeinformationen k�nnen nicht abgerufen werden "
          )
        );
      }
    );
  };

  ////////// Load Building Summary /////////////
  useEffect(() => {
    loadBuildingSummary(buildingId);
  }, []);

  const loadBuildingSummary = () => {
    setLoadInformation(true);
    Get(
      { buildingId: buildingId },
      Get_BuldingSummary_URL,
      null,
      (resp) => {
        setLoadInformation(false);
        setBuildingSummary(resp?.data);
      },
      (error) => {
        setLoadInformation(false);
        enqueueSnackbar(
          getTranslation(
            " Unable to get Building Summary ",
            " Impossible d'obtenir le r�sum� du b�timent ",
            " Geb�udezusammenfassung kann nicht abgerufen werden "
          )
        );
      }
    );
  };

  return (
    <div>
      {/* <AddAppartment apartment={editAprtment} enableEdit={editAprtment !== null }/> */}
      {loadInformation ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <BuildingInformation buildingInfo={buildingInformation} />
      )}

      <br />
      {loadInformation ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <SummaryBuilding summaryBuilding={buildingSummary} />
      )}

      <br />
      <Appartments
        loading={appartmentLoading}
        rows={appartmentList}
        onFilter={(values) => loadApartments(values)}
        onDelete={(item) => {
          var newModel = appartmentList;
          newModel.data = appartmentList.data.filter((x) => x.id !== item.id);
          newModel.totalCount = appartmentList.totalCount - 1;
          setApartmentList(newModel);
        }}
        onApartmentAdd={(item) => {
          loadApartments(filterItems);
          // var newModel = appartmentList;
          // newModel.data = [...appartmentList.data, item];
          // newModel.totalCount = appartmentList.totalCount + 1;
          // setApartmentList(newModel);
        }}
        onApartmentUpdate={(item) => {
          loadApartments(filterItems);
          var newModel = appartmentList;
          const arr = newModel.data;
          var index = arr.findIndex((x) => x.id === item.id);
          arr[index] = item;
          newModel.data = arr;
          setApartmentList(newModel);
        }}
      />
    </div>
  );
};
export default List;
