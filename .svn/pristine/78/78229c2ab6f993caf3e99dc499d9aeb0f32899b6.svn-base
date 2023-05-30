import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { borders } from "@material-ui/system";
import { makeStyles, Typography } from "@material-ui/core";
import { matchPath } from "react-router";
import {
  BankIcon,
  EmailIcon,
  GenerateDueIcon,
  PreviousDueIcon,
} from "../../components/icons";
import { getTranslation } from "../../heplers/translationHelper";
const useStyles = makeStyles((theme) => ({
  menuItem: {
    backgroundColor: theme.palette.common.white,
    borderBottom: "2px " + theme.palette.common.white + " solid",
    "&:hover": {
      borderBottom: "2px " + theme.palette.primary.dark + " solid",
    },
  },
  selected: {
    borderBottom: "2px " + theme.palette.primary.dark + " solid",
    backgroundColor: theme.palette.common.white,
  },
}));
function SubMenus({isMobile}) {
  const [hideTopMenu, setHideTopMenu] = useState(true);

  const [submenu, setSubmenu] = useState();
  const [selectedMenu, setSelectedMenu] = useState("");
  let location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/dues")) {
      setSubmenu(duesSubmenu);
      setHideTopMenu(false);
      // match ? setHideTopMenu(false) : setHideTopMenu(true);
    } else if (location.pathname.startsWith("/setting")) {
      setSubmenu(settingsSubmenu);
      setHideTopMenu(false);
      // match ? setHideTopMenu(false) : setHideTopMenu(true);
    } else {
      setHideTopMenu(true);
    }
  }, [location]);

  return (
    <>
      {hideTopMenu === false ? (
        <List style={flexContainer}>
          {submenu.map((item) => (
            <ListItemLink
              color="inherit"
              to={item.link}
              primary={item.title}
              component={item.component}
              selected={location.pathname.endsWith(item.link)}
              key={item.key}
            />
          ))}
        </List>
      ) : (
        <Typography color="secondary" variant="h5">
            {isMobile==false ? getTranslation(" Welcome ", " Bienvenue ", " Willkommen "):null}
        </Typography>
      )}
    </>
  );
}

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 0,
};

function ListItemLink(props) {
  const { primary, to, selected, component } = props;
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );
  const Component = component;
  return (
    <li>
      <ListItem
        button
        component={renderLink}
        selected={selected}
        classes={{ selected: classes.selected, className: classes.menuItem }}
      >
        {component ? <Component /> : <ListItemText primary={primary} />}
      </ListItem>
    </li>
  );
}
export default SubMenus;
//  Company Sub menus

const duesSubmenu = [
  { key: "generated", component: GenerateDueIcon, link: "/dues/duesGenerated" },
  { key: "previous", component: PreviousDueIcon, link: "/dues/previousDues" },
];

//  Settings Sub menus

const settingsSubmenu = [
  { key: "emailSetting", component: EmailIcon, link: "/setting/email" },
  { key: "bankSetting", component: BankIcon, link: "/settings/bank" },
];