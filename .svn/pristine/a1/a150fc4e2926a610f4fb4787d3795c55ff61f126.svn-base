import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { DoneIcon, HomeIcon, WalletIcon } from "../../../components/icons";
import { getTranslation } from "../../../heplers/translationHelper";

export const DashboardCard = ({ details, onClickDetails }) => {
  const [focused, setFocused] = useState(false);
  return (
    <Card
      onMouseLeave={() => setFocused(false)}
      onMouseEnter={() => setFocused(true)}
      onClick={() => onClickDetails(details)}
      style={{
        cursor: "pointer",
        width: "290px",
        height: focused ? "170px" : "150px",
        background: "#233044",
        color: "white",
        transition: "all 0.9s cubic-bezier(0.25, 0.8, 0.25, 1)",

        borderRadius: "10px",
      }}
    >
      <CardContent>
        {focused ? (
          <Box
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              paddingTop: "60px",
              paddingLeft: "15px",
              marginTop: "-70px",
              marginLeft: "210px",
              transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
              background: "linear-gradient(0deg, #FB5E39, #FB5E39)",
            }}
          >
            <Typography variant="h6">
              {getTranslation(
                "Details",
                "Informations detailles",
                "Detaillierte Informationen"
              )}
            </Typography>
          </Box>
        ) : null}
        <Box pl={3} style={{ paddingTop: "-20px" }}>
          <Typography variant="h5">{getTranslation(details.title,details.title,details.title)}</Typography>
          <Typography variant="h2" style={{ display: "inline" }}>
            {details.value}
          </Typography>
          {/* <Typography
            style={{ fontSize: "12px", display: "inline", marginLeft: "4px" }}
          >
            {details.percentage}
          </Typography> */}
          <Typography variant="h5">
            {details.cardType==1 ? getTranslation("Collected","Collected","Collected")+" ":""}
            {details.subtitle !== "" ? details.subtitle : <br />}
          </Typography>
        </Box>
        <Box
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "16px",
            paddingTop: "8px",
            paddingLeft: "8px",
            marginTop: "-7px",
            transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
            marginLeft: "230px",
            background: "linear-gradient(0deg, #FB5E39, #FB5E39)",
          }}
        >
          <GetIcon type={details.cardType} />
        </Box>
      </CardContent>
    </Card>
  );
};

const GetIcon = (type) => {
  return (
    <div>
      {type.type === 0 ? (
        <WalletIcon />
      ) : type.type === 1 ? (
        <HomeIcon />
      ) : (
        <DoneIcon />
      )}
    </div>
  );
};
