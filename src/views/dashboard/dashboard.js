import { Box } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Get } from "../../actions";
import { Get_BuildingsProfitBar_URL } from "../../constants/apiUrls";
import { FinancialReportBuildings } from "./components/financialReportBuildings";
import { DashBoardCardList } from "./dashboardCardList";
import { getTranslation } from "../../heplers/translationHelper";
import { Helmet } from "react-helmet";

export const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [profitbarData, setProfitbarData] = useState([]);
  const [profitbarDataLoading, setProfitbarDataLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "Clear_All_BreadCrumb" });
    dispatch({
      type: "Add_BreadCrumb",
      payload: {
        title: getTranslation(
          " Dashboard ",
          " Tableau de bord ",
          " Armaturenbrett "
        ),
        url: "/dashboard",
      },
    });
  }, []);

  useEffect(() => {
    Get(
      {},
      Get_BuildingsProfitBar_URL,
      null,
      (resp) => {
        setProfitbarData(resp?.data);
      },
      (error) => {}
    );
  }, []);
  return (
    <div>
       <Helmet>
        <title>
        {getTranslation("Dashboard", "Dashboard", "Dashboard")}
        </title>
      </Helmet>
      
      <DashBoardCardList />
      <Box
        style={{
          marginRight: "2%",
          marginTop: "2%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        {/* Dashboard Table Hide, Will be ReDesigned and Made useful for client on demand.*/}
        {/* <FinancialReportBuildings data={profitbarData} /> */}
      </Box>
    </div>
  );
};
