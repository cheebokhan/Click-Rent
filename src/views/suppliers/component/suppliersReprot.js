import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ref } from "yup";
import { format } from "../../../heplers/format";
import { getTranslation } from "../../../heplers/translationHelper";
import LogoFile1 from "../../../assests/icons/favIcon.png";
import "../../buildings/component/reports/reportStyle.css";
import { ReportLayout, reportStyles } from "../../report/ReportLayout";
import _, { __ } from "lodash";

export const AllSupplierReport = React.forwardRef(({ data }, ref) => {
  const classes = reportStyles();

  if (typeof data !== "undefined" && data !== null) {

    const noData = typeof data === "undefined";
    return (<ReportLayout ref={ref} noData={noData} title={getTranslation("All Supplier Report","All Supplier Report","All Supplier Report")}>
      <table>
        <tr>
          <td>
            <Typography className={classes.dateStyle} >
              {getTranslation("From", "De", "Von")}:
            </Typography>
          </td>
          <td>
            <Typography className={classes.dateStyle} >{format("date", data?.from)}</Typography>
          </td>
          <td>
            <Typography className={classes.dateStyle}>
              {getTranslation("To", "�", "Bis")}:
            </Typography>
          </td>
          <td>
            <Typography className={classes.dateStyle}>
              {format("date", data?.to)}
            </Typography>
          </td>

        </tr>
      </table>
      <Box marginTop="25px" >
        <Typography>  {getTranslation(
          " Summary ",
          " Summary ",
          " Summary "
        )}</Typography>
        <table className={classes.table}>
          <thead>
            <tr>
              <th width="40%" align="left">
                <Typography className={classes.titleStyles}>
                  {getTranslation(
                    "Supplier",
                    "Supplier",
                    "Supplier"
                  )}</Typography>
              </th>
              <th width="20%" align="right"
              >
                <Typography className={classes.titleStyles}>
                  {getTranslation(" Cost ", " Cost", " Cost ")}</Typography>
              </th>

            </tr>
          </thead>
          <tbody>
            {data?.suppliers?.map((supplier) => (
              <tr>
                <td >
                  <Typography className={classes.subtitle}> {supplier?.name}</Typography>
                </td>

                <td align="right">
                  <Typography className={classes.subtitle}> {format("number", _.sumBy(supplier.fundActivities, x => x.amountDeposit))}</Typography>
                </td>
              </tr>
            ))}

          </tbody>

          <tfoot>
            <tr>
              <td colSpan={4} style={{ height: "14px" }}></td>
            </tr>
            <tr>
              <td align={"center"} style={{
                background: "#233044",
                color: "#fff",
              }}>

                <Typography className={classes.titleStyles} align="left"
                >
                  {getTranslation(" Total ", " Totale ", " Gesamt ")}
                </Typography>

              </td>
              <td align="right" style={{
                background: "#EB5C3E",
                color: "#fff",
              }}>
                <Typography className={classes.titleStyles}>
                  &euro;{" "}
                  {format("number", _.sumBy(data?.suppliers, x => _.sumBy(x.fundActivities, x => x.amountDeposit)))}{" "}
                </Typography>
              </td>
            </tr>
          </tfoot>
        </table>
        <br />
        <hr />
        <br />
      </Box>
      {data?.suppliers.map((supplier) => (
        <>
          <Card>
            <CardHeader title={supplier.name} style={{ color: "#233044" }} />
            <CardContent>
              <div>
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th className={classes.titleStyles} align="left">
                         {getTranslation("Date", "Date", "Date")}
                        </th>
                      <th align="left"
                        className={classes.titleStyles}
                      >
                        {getTranslation("Category", "Category", "Category")}
                      </th>
                      <th align="left"
                        className={classes.titleStyles}
                      >
                        {getTranslation("Building", "Building", "Building")}
                      </th>
                      <th
                        className={classes.titleStyles}
                        style={{ textAlign: "right" }}
                      >
                        {getTranslation("Amount", "Amount", "Amount")}

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.orderBy(supplier.fundActivities,['date'],['desc'])?.map((fundActivity) => (
                      <tr>
                        <td className={classes.maltoseTitle}>
                          {format("date", fundActivity?.date)}
                        </td>
                        <td className={classes.subtitle} >
                          {fundActivity?.activity}
                        </td>
                        <td className={classes.subtitle} >
                          {fundActivity?.buildingName}
                         {"-"}
                        </td>

                        <td className={classes.subtitle} align="right">
                          {format("number", fundActivity?.amountDeposit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                  <tr>
              <td colSpan={4} style={{ height: "14px" }}></td>
            </tr>
                    <tr style={{
                      background: "#233044",
                      color: "#fff",
                    }}>
                    

                      <td style={{
                      background: "#233044",
                      color: "#fff",
                    }}>
                        <Typography className={classes.titleStyles} align="left" >
                          {getTranslation(" Total ", " Totale ", " Gesamt ")}
                        </Typography>

                      </td>
                      <td ></td>
                      <td></td>
                      <td align="right" style={{
                background: "#EB5C3E",
                color: "#fff",
              }}>
                      <Typography className={classes.titleStyles}>&euro; {format("number", _.sumBy(supplier?.fundActivities, x => x.amountDeposit < 0 ? (-1) * x.amountDeposit : x.amountDeposit))}</Typography>

                      </td>
                    </tr>
                  </tfoot>
                </table>
                <br />
                <br />
              </div>
            </CardContent>
          </Card>
          <br />
          <br />
        </>
      ))}
    </ReportLayout>
    );
  } else return <div ref={ref}>No Data Found</div>;
});
