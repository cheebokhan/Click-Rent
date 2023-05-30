/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import {
  Box,
  Drawer,
  List,
  ListSubheader,
  Divider,
  Typography,
  Dialog,
  CircularProgress
} from "@material-ui/core";
import React, { useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { matchPath } from "react-router";
import { Link as RouterLink,useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import navConfig from "./Menu";
import {Logo, Logo1} from "../../components/Logo"
import useStyles from "../../assests/styles/layout/sidebar";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import moment from "moment/moment";
import DialogComponent from "../../components/Dialog";
import authService from "../../utils/authUtils";
import { WarningOutlined } from "@material-ui/icons";
import { useState } from "react";
import { getTranslation } from "../../heplers/translationHelper";
function renderNavItems({
  items,
  depth,
  pathname,
  ...rest
}) {
  return (
    <List disablePadding >
      {items.reduce(
        (acc, item) =>
          reduceChildRoutes({ acc, pathname, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0,
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
        component={item.component}
      >
        <Box pl={5}  >
          {renderNavItems({
            depth: depth + 3,
            pathname,
            items: item.items,
          })}
        </Box>
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        open={true}
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
        component={item.component}
      />
    );
  }

  return acc;
}




function Sidebar({ openMobile, onMobileClose }) {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const [openAlert,setOpenAlert]=useState(false)
  const handleDrawerClose = () => {
    onMobileClose()
  };

  const selectedOrg=authService.getCustomerOrganizations()?.find(x=>x.customerId==authService.getCustomerId());

  useEffect(() => {
    if (selectedOrg?.packageStatus == 3)
      setOpenAlert(moment(selectedOrg?.trialEndDate).isBefore(moment()))
  }, [])

  const content = (
    <Box height="100%" display="flex" flexDirection="column" style={{backgroundColor:"rgb(35, 48, 68)",}}>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        
          <Box p={2} mt={1} display="flex" justifyContent="center" >
            <RouterLink to="/">
              <Logo1 height="120"   />
            </RouterLink>
          </Box>
        
<Divider style={{backgroundColor:"white"}} />
        <Box px={2.8} py={1.5} >
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky >
                  {config.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: config.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={openMobile}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
        {content}
        {selectedOrg && selectedOrg?.packageStatus == 3 ?
          <div style={{ backgroundColor: "rgb(35, 48, 68)", color: "white", paddingBottom: "20px", textAlign: "center" }} >
            <Typography> {getTranslation("Test period", "Période test", "Période test")}:</Typography>
            <Typography style={{ marginBottom: "30px" }}> {moment(selectedOrg.trialEndDate).isBefore(moment()) ? 0 : moment(selectedOrg.trialEndDate).diff(moment(),"days") + " " + getTranslation("days left", "jours restant", "jours restant")}</Typography>
            <Typography style={{ fontSize: "10px" }} >&copy; IMPACT SOFT {moment().format("YYYY")}</Typography>
            <Typography style={{ fontSize: "10px" }}>Version 2.2</Typography>

          </div>
          : null}
          <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        </Drawer>
        {selectedOrg && selectedOrg?.packageStatus == 3 ?
     <DialogComponent open={openAlert} maxWidth={"sm"} fullWidth title={getTranslation("Trial Alert","Trial Alert","Trial Alert")} onClose={()=>setOpenAlert(false)}>
      <div style={{textAlign:"center"}}> 
      <WarningOutlined />
      </div>
      <Typography>{getTranslation("Your trial period for organization is expired. Please Upgrade the app before","Your trial period for organization is expired. Please Upgrade the app before","Your trial period for organization is expired. Please Upgrade the app before")} {selectedOrg ? moment(selectedOrg?.trialEndDate).add("days",selectedOrg?.deadline).format("DD-MM-YYYY") :0}</Typography>
     </DialogComponent>
:null}
    </>
  );
}
export default Sidebar;