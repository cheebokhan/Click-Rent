import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { format } from "../../../../../heplers/format";
import { getTranslation } from "../../../../../heplers/translationHelper";

export const SummaryBuilding = ({ summaryBuilding }) => {
  return (
    <Card>
      <CardHeader
        title={getTranslation("Summary", "Sommaire", "Zusammenfassung")}
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
            <Box display="flex">
              <Typography variant="h5">{getTranslation("Rent Generated  :","Loyer généré  :","Miete generiert  :")}</Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {format("number", summaryBuilding?.rentGenerated)} €
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <Box display="flex">
              <Typography variant="h5">{getTranslation("Rent Paid  :  ","loyer payé  :  ","Miete gezahlt  :  ")}</Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {format("number", summaryBuilding?.rentPaid)} €
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <Box display="flex">
              <Typography variant="h5">{getTranslation("Unpaid:","non payé  :","unbezahlt  :")}</Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {format("number", summaryBuilding?.unpaid)} €
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <Box display="flex">
              <Typography variant="h5">{getTranslation("Expenses","Expenses","Expenses")}:</Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {format("number", summaryBuilding?.cost)} €
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Box display="flex">
              <Typography variant="h5">Profit:</Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {format("number", summaryBuilding?.profit)} €
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
