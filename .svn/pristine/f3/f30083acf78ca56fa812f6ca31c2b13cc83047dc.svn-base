import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Get } from "../../actions";
import { Get_DashboardCards_URL } from "../../constants/apiUrls";
import { Bank } from "../bank";
// import { FinancialReportBuildings } from "./components/financialReportBuildings";
import { DashboardCard } from "./components/dashBoardCard";

export const DashBoardCardList = () => {
  const history = useHistory();
  const [state, setState] = useState({
    filter:''
  });
  const [cards, setCards] = useState([]);
  useEffect(() => {
    Get(
      {},
      Get_DashboardCards_URL,
      null,
      (resp) => {
        setCards(resp.data);
      },
      (error) => {}
    );
  }, []);
  const handleCallBack = (details) => {
    return (
      <div>
        {
        details.cardType === 0
          ? history.push({
            pathname: "/bank/",
            search: '?query=iban',
            state: {
              filter: details.title,
            },
          })
          : details.cardType === 1
            ? history.push("/tanents")
            : details.cardType === 2

              ? history.push("/dues/duesGenerated")
              : details.cardType === 3 ?
                history.push("/bank/") : null
        }
      </div>
    );
  };
  return (
    <Grid container spacing={2}>
      {cards?.map((item) => (
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <DashboardCard details={item} onClickDetails={handleCallBack} />
        </Grid>
      ))}
    </Grid>
  );
};
