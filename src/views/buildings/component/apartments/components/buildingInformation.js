import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { getTranslation } from "../../../../../heplers/translationHelper";

export const BuildingInformation = ({ buildingInfo }) => {
  console.log("sklhdkjfds", buildingInfo);
  return (
    <Card>
      <CardHeader
        title={getTranslation(
          "Building Information",
          "Informations sur le bâtiment",
          "Gebäude informationen"
        )}
      />
      <CardContent>
        <Grid
          container
          style={{
            marginLeft: "5%",
            marginTop: "-1.5%",
          }}
        >
          {/* /////////////////// Headers ///////////////////// */}
          <Grid item xs={12} sm={12} md={3} lg={3}>
          <Box
              display="flex"
            >
              <Typography variant="h5" >
              {getTranslation("Name  :  ","Nom  :  ","Name  :  ")} 
              </Typography>
              <Typography variant="h5" style={{ fontWeight  : "bold" }}>
              {buildingInfo?.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
          <Box
              display="flex"
            >
              <Typography variant="h5" >
              {getTranslation("Address  :  ","Adresse  :  ","Adresse  :  ")} 
              </Typography>
              <Typography variant="h5" style={{ fontWeight  : "bold" }}>
              {buildingInfo?.address}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
          <Box
              display="flex"
            >
              <Typography variant="h5" >
                {getTranslation("Town  :  ","ville  :  ","Dorf  :  ")} 
              </Typography>
              <Typography variant="h5" style={{ fontWeight  : "bold" }}>
                {buildingInfo?.town}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Box
              display="flex"
            >
              <Typography variant="h5" >
                {getTranslation("Zipcode  :  ","Code postal  :  ","Postleitzahl  :  ")} 
              </Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {buildingInfo?.zipCode}
              </Typography>
            </Box>
          </Grid>
          
        </Grid>
      </CardContent>
    </Card>
  );
};
