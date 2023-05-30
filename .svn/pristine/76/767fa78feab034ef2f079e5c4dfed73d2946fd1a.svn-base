import React, { useState } from "react";
import {
  AppBar,
  Box,
  Typography,
  Button,
  Toolbar,
  Avatar,
  Menu,
  IconButton,
  MenuItem,
  Tooltip,
  Select,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { HiOutlineLogout, HiUserCircle } from "react-icons/hi";
import useStyles from "../../assests/styles/layout/topbar";
import SubMenus from "./submenu";
import { Logout } from "../../actions";
import authUtils from "../../utils/authUtils";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import { ContactSupportOutlined, HelpOutline } from "@material-ui/icons";
import { EnglishLanguageIcon, FrenchLanguageIcon, GermanLanguageIcon } from "../../components/icons";
import { getTranslation } from "../../heplers/translationHelper";

function TopBar({ className, navOpen,isMobile, handleDrawerOpen, ...rest }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  var [profileMenu, setProfileMenu] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const handleNavigateToProfile = () => {
    history.push("/account/profile");
    setProfileMenu(null);
  };

  const handleLogout = () => {
    dispatch(Logout()).then((resp) => {

    });
    authUtils.logout();
    history.push("/login");
  };

  const handleContactUs = () => {
    window.open("https://form.jotform.com/220413974982361", "_blank");
  }
  return (
    navOpen && isMobile? null :
    <AppBar
      className={clsx(classes.root, {
        [classes.rootshift]: !navOpen,
      })}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, navOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <SubMenus isMobile={isMobile} />
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          {isMobile==false ?
          <a style={{ marginRight: "50px" }} target="_blank" href="https://appmanager.impact-soft.com/market/1">{getTranslation("Wants to have more organizations?","Wants to have more organizations?","Wants to have more organizations?")}</a>
:null}

          <Select
            style={{
              marginRight: "20px",
             
              height: "34px",
              borderRadius: "17px",
            }}
            variant="outlined"
            defaultValue={localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"}
            onChange={(e) => {
              localStorage.setItem("lang", e.target.value)
              window.location.reload();

            }}
          >
            <MenuItem value="en">
              <IconButton >
                <EnglishLanguageIcon />
              </IconButton>
              {isMobile==false ? getTranslation("English","English","English"):null}
            </MenuItem>
            <MenuItem value="fr">
              <IconButton >
                <FrenchLanguageIcon />
              </IconButton>
              {isMobile==false ? getTranslation("French","French","French"):null}
              
            </MenuItem>
            <MenuItem value="gr">
              <IconButton >
                <GermanLanguageIcon />
              </IconButton>
              {isMobile==false ? getTranslation("German","German","German") : null }
            </MenuItem>
          </Select>
          <IconButton
            className={classes.helpButton}
            onClick={handleContactUs}
          >
            <Tooltip title={getTranslation("Contact Us", "Contactez-nous", "Kontaktieren Sie uns")} arrow>
              <HelpOutline fontSize="large" />
            </Tooltip>
          </IconButton>
          <Select
            style={{
              marginRight: "20px",
              width: "160px",
              height: "34px",
              borderRadius: "17px",
            }}
            variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={getTranslation(
              "Select Organization",
              "S�lectionnez l'organisation",
              "W�hlen Sie Organisation aus"
            )}
            onChange={(e) => {
              // setFieldValue("customerId", e.target.value);
              authUtils.setCustomerId(e.target.value)
              const selectedOrg=authUtils.getCustomerOrganizations().find(x=>x.customerId==e.target.value);
              authUtils.setIsStarter(selectedOrg.isStarter);

              window.location.reload();
              console.log("hagshdgasdgha", e.target.value)
            }}
            defaultValue={authUtils.getCustomerId()}
            disabled={authUtils.getCustomerOrganizations()?.length <= 1}
          >
            {authUtils.getCustomerOrganizations()?.map((app) => (
              <MenuItem value={app.customerId}>
                {app.organizationName}
              </MenuItem>
            ))}
          </Select>
          <IconButton
            aria-haspopup="true"
            aria-controls="profile-menu"
            variant="circular"
            className={classes.avatar}
            onClick={(e) => {
              setProfileMenu(e.currentTarget);
            }}
          >
            {user?.firstName?.slice(0, 1)}
            {user?.lastName?.slice(0, 1)}
          </IconButton>


          <Menu
            id="profile-menu"
            open={Boolean(profileMenu)}
            anchorEl={profileMenu}
            onClose={() => setProfileMenu(null)}
            disableAutoFocusItem
            className={classes.menuBar}
            MenuListProps={{ className: classes.profileMenuList }}
          >
            <MenuItem>
              <Box
                onClick={handleNavigateToProfile}
                display="flex"
                alignItems="center"
              >
                <HiUserCircle className={classes.icon} />
                <Typography variant="body1">{getTranslation("My Account", "Mon compte", "Mein Konto")}</Typography>
              </Box>
            </MenuItem>
            <MenuItem>
              <Box display="flex" alignItems="center" onClick={handleLogout}>
                <HiOutlineLogout className={classes.icon} />
                <Typography variant="body1">{getTranslation("Logout", "Se d�connecter", "Ausloggen")}</Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(TopBar);
