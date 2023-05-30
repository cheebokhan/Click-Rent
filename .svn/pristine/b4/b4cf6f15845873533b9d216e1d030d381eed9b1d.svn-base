import React from "react";
import { Typography, Breadcrumbs, Link } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTranslation } from "../heplers/translationHelper";

const SimpleBreadcrumbs = (props) => {
  const { history, location } = props;
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((x) => x);
  const { breadcrumbs } = useSelector((state) => state.breadcrumbs);

  return (
    <Breadcrumbs
      style={{ color: "#fff", padding: "10px" }}
      aria-label="breadcrumb"
    >

      {pathnames.length === 0 ? (
        <Typography variant="body2">
          <Link
            color="inherit"
            style={{ cursor: "pointer"}}
            onClick={() => history.push("/")}
          >
            {getTranslation("Home", "Accueil", "Start")}
          </Link>
        </Typography>
      ) : (
        <Typography variant="body2" 
        href="/"
        onClick={() => history.push("/")}
        >{getTranslation("Home", "Accueil", "Start")}</Typography>
      )}
      {breadcrumbs.map((breadCrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return isLast ? (
          <Typography variant="body2">
              {getTranslation(breadCrumb.title,breadCrumb.title,breadCrumb.title)}
            
          </Typography>
        ) : (
          <Typography variant="body2">
            <Link
              color="inherit"
              style={{ cursor: "pointer"}}
              onClick={() => history.push(breadCrumb.url)}
            >
              {getTranslation(breadCrumb.title,breadCrumb.title,breadCrumb.title)}
            </Link>
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default withRouter(SimpleBreadcrumbs);
