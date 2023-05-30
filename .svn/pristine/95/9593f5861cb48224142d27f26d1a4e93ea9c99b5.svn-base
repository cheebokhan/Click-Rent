import {
    Grid,
    Typography,
    Box,
    makeStyles,
  } from "@material-ui/core";
  import React, { useEffect, useState } from "react";
  import { ref } from "yup";
  import { format } from "../../heplers/format";
  import { getTranslation } from "../../heplers/translationHelper";
  import LogoFile1 from "../../assests/images/Latest-Logo.png";
  import printLogoFooter from "../../assests/icons/logoForPrint.png";
  import _ from "lodash";
  import "./reportStyle.css";
  import authService from "../../utils/authUtils";

  export const reportStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      height: "100%"
    },
    headSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    titleStyles: {
      fontWeight: 'bold',
      fontSize: "12px",
    },
  
    subtitle: {
      fontSize: "12px",
    },
    endCards: {
      fontWeight: "bold",
      fontSize: "10px",
    },
    dateStyle: {
      color: "#EB5C3E !important",
      fontWeight: 500,
      fontSize: "12px",
      marginRight:'5px'
    },
    maltoseTitle: {
      color: "#EB5C3E !important",
      fontWeight: 400,
      fontSize: "12px",
    },
    filterSection: {
      margin: "40px 0px",
      width: "100%",
      height: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "5px",
      "& tfoot": {
        pageBreakInside: "avoid",
        pageBreakAfter: "avoid",
        pageBreakBefore: "avoid",
  
  
      },
      "& th ": {
        border: "2px solid #fff !important",
        padding: "5px",
        backgroundColor: "#EBEAE8",
      },
      "& td": {
        padding: "2px",
        margin: "2px",
      },
      "& tr": {
        pageBreakInside: "avoid",
        pageBreakAfter: "auto",
      },
      " & tr:nth-child(even) ": {
        backgroundColor: "#EBEAE8",
      },
    },
  }));

export const ReportLayout = React.forwardRef(({ children, noData,title }, ref) => {
  const classes = reportStyles();
  var user = authService.getUser();
      
  //get the organization from authservice 
     var organization=authService.getCustomerOrganizations()?.find(x=>x.customerId==authService.getCustomerId());
     
  return (<div ref={ref} className={classes.root} >
    <table >
      <thead>
        <tr>
          <th>
            <Box style={{
              width: '100%',
              borderRadius: '25px',
              borderColor: '#fb2f39',
              borderWidth: '1px',
              borderStyle: 'solid',
              padding: '10px',
              marginBottom: '20px'
            }}>
              <Grid container>
                <Grid item sm={4} xs={4} style={{ textAlign: 'left' }}>
                  <img
                    alt="Logo"
                    src={LogoFile1}
                    style={{ width: "25%" }}
                  />
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                <Typography className={classes.titleStyles}>{getTranslation(title, title, title)}</Typography>

                </Grid>
                <Grid item xs={4} style={{ textAlign: 'right', paddingRight: '50px', marginTop: 'auto', marginBottom: 'auto' }}>
                  <Typography className={classes.subtitle}>{getTranslation("Name", "Name", "Name")} :
                   {organization.organizationName}
                  </Typography>

                  <Typography className={classes.subtitle}>
                    {getTranslation("Printed Date", "Printed Date", "Printed Date")} : {format("date", new Date())}
                  </Typography>
                </Grid>

              </Grid>

            </Box>

          </th>
        </tr>

      </thead>
      <tbody >
        <tr >
          <td>
            {noData ?<Typography>
                {getTranslation(
                  " No Data Found ",
                  " Aucune donn�e disponible ",
                  " Keine Daten gefunden "
                )}
              </Typography>
              :
              <div style={{ marginTop: '20px' }} >
                {children}
              </div>
              }
          </td>
        </tr>
      </tbody>
      {/* <tfoot style={{position:'fixed', bottom:0}}>
            <tr>
              <td>
                <Typography>
                hasgdashgdjkas
                </Typography>
                <Typography>
                hasgdashgdjkas
                </Typography>
                <Typography>
                hasgdashgdjkas
                </Typography>
              </td>
            </tr>
          </tfoot> */}
    </table>

  </div>


  );

});
  