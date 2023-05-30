import React from "react";
import { Grid } from "@material-ui/core";
import PersonalInfo from "./PersonalInfo";
import LoginInfo from "./LoginInfo";
import Page from "../../../components/Page";
import { getTranslation } from "../../../heplers/translationHelper";

const ManageMyAccount = () => {
  return (
    <Page title={getTranslation("My Account", "Mon compte", "Mein Konto")}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={12} lg={12} xl={!2}>
          <PersonalInfo />
        </Grid>
        <Grid item sm={12} md={12} lg={12} xl={!2}>
          <LoginInfo />
        </Grid>
      </Grid>
    </Page>
  );
};

export default ManageMyAccount;
