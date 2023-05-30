import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";

import { format } from "../../../../heplers/format";
import { getTranslation } from "../../../../heplers/translationHelper";
import LogoFile1 from "../../../../assests/icons/favIcon.png";
import { ReportLayout, reportStyles } from "../../../report/ReportLayout";

export const AllTenantReport = React.forwardRef(({ data }, ref) => {
  const noData = typeof data === "undefined" || typeof data.rows === "undefined";
  const classes = reportStyles();


  function sortBy(sortColumn) {
    switch (sortColumn) {
      case "name":
        return "Name";
        break;
      case "apartmentNo":
        return "Apartment";
        break;
      case "lastPaymentDate":
        return "Last payment";
        break;
      case "accountBalance":
        return "Balance";
        break;
      case "telephone":
        return "Phone";
        break;
    }
  }

  function status(s) {
    switch (s) {
      case "active":
        return "Active";
        break;
      case "inactive":
        return "Inactive";
        break;
      case "onhold":
        return "On hold";
        break;
      
    }
  }




  return (<ReportLayout ref={ref} noData={noData} title={getTranslation("List Tenants","List Tenants","List Tenants")}>
    <table>
      <tr>
        <td>
          <Typography className={classes.dateStyle} >
            {getTranslation("Status:", "Status:", "Status:") + " " + getTranslation
            (status(data?.filterItems?.status),status(data?.filterItems?.status),status(data?.filterItems?.status))}
          </Typography>
        </td>
      </tr>
      <tr>
        <td>
          <Typography className={classes.dateStyle} >
            {getTranslation("Sort by:", "Sort by:", "Sort by:") + " " + getTranslation(
              sortBy(data?.filterItems?.sort),sortBy(data?.filterItems?.sort),sortBy(data?.filterItems?.sort))}
          </Typography>
        </td>
      </tr>
      <tr>
        <td>
          <Typography className={classes.dateStyle} >
            {getTranslation("Sort direction:","Sort direction:","Sort direction:") + " "} {data?.filterItems?.sortDirection == 0 ? 
            getTranslation("Ascending","Ascending","Ascending") : getTranslation("Descending","Descending","Descending")}
          </Typography>
        </td>
      </tr>
      <tr>
        <td>
          <Typography className={classes.dateStyle} >
            {getTranslation("Search:","Search:","Search:")} {data?.filterItems?.searchString ? data?.filterItems?.searchString : "-"}
          </Typography>
        </td>
      </tr>
    </table>

    <table className={classes.table}>
      <thead>
        <tr>
          <th align="left"
            className={classes.titleStyles}
          >
            {getTranslation("Name", "Name", "Name")}
          </th>
          <th align="left"
            className={classes.titleStyles}
          >
            {getTranslation("Building", "Building", "Building")}
          </th>
          <th
            className={classes.titleStyles}
            align="left"
          >
            {getTranslation("Appartment", "Appartment", "Appartment")}

          </th>
          <th
            className={classes.titleStyles}
            align="left"
          >
            {getTranslation("Last Payment", "Last Payment", "Last Payment")}

          </th>
          <th
            className={classes.titleStyles}
            align="right"
          >
            {getTranslation("Phone", "Phone", "Phone")}

          </th>
          <th
            className={classes.titleStyles}
            align="right"
          >
            {getTranslation("Balance", "Balance", "Balance")}

          </th>

        </tr>
      </thead>
      <tbody>
        {data?.rows?.map((tenant) => {
          return (
            <tr>
              <td className={classes.subtitle}>{tenant.name}</td>
              <td className={classes.subtitle} align="left">
                {tenant.buildingName}                
              </td>
              <td className={classes.subtitle} align="left">
                {tenant.apartmentNo}
              </td>
             {
              tenant.isPaymentDoneInLastMonth == false?
                <td
                  className={classes.subtitle}
                  align="left"
                  style={{ color: 'red' }}
                >
                  {format('date', tenant.lastPaymentDate)}
                </td>:

                <td
                  className={classes.subtitle}
                  align="left"
                  style={{ color: 'green' }}
                >
                  {format('date', tenant.lastPaymentDate)}
                </td>
              } 
              <td className={classes.subtitle} align="right">
                {format('number', tenant.telephone)}
              </td>
              <td className={classes.subtitle} align="right">
                {format('number', tenant.accountBalance)}
              </td>
              
            </tr>
          );
        })}

        <tr style={{background: "#233044"}}>
        <td align={"center"} style={{
                // background: "#233044",
                color: "#fff",
              }}>

                <Typography className={classes.titleStyles} align="left"
                >
                  {getTranslation(" Total ", " Totale ", " Gesamt ")}
                </Typography>

              </td>
              <td></td><td style={{background:"#233044"}}></td>
              <td style={{background: "#233044"}}></td>
              <td style={{background: "#233044"}}></td>

              <td align="right" style={{
                background: "#EB5C3E",
                color: "#fff",
              }}>
                <Typography className={classes.titleStyles}>
                  &euro;{" "}
                  {format("number", data?.totalBalance)}{" "}
                </Typography>
              </td>
        </tr>
      </tbody>
      <tfoot>

      </tfoot>
    </table>
  </ReportLayout>

  );
});
