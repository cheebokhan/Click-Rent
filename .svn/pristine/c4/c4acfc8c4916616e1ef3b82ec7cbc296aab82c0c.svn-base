import { Typography } from "@material-ui/core";
import {
  RiBankFill,
  RiBuilding2Fill,
  RiDashboardFill,
  RiMailAddFill,
  RiProfileFill,
  RiProfileLine,
  RiSettings2Fill,
  RiGitRepositoryFill,
} from "react-icons/ri";
import { getTranslation } from "../../heplers/translationHelper";
import authUtils from "../../utils/authUtils";

const navConfig = [
  {
    subheader: "",
    items: [
      {
        title: getTranslation(
          " Dashboard ",
          " Tableau de bord ",
          " Armaturenbrett "
        ),
        icon: RiDashboardFill,
        href: "/dashboard",
      },
      {
        title: getTranslation(" Buildings ", " Immeubles ", " Immobilien "),
        icon: RiBuilding2Fill,
        href: "/buildings",
      },
      {
        title: getTranslation(" Tenants ", " Tenants ", " Tanenten "),
        icon: RiProfileLine,
        href: "/tanents",
      },
      {
        title: getTranslation(" Dues ", " Locataires ", " Mieter "),
        icon: RiMailAddFill,
        href: "/dues/duesGenerated",
      },
      {
        title: getTranslation(" Bank ", " Banque ", " Bank "),
        icon: RiBankFill,
        href: "/bank",
        component:()=><span >{getTranslation(" Bank ", " Banque ", " Bank ") + " "} {authUtils.getIsStarter()==true?
          <span style={{color:'#fb5e39'}} > {getTranslation("Upgrade","Upgrade","Upgrade")}</span> :null}</span>
      },
      {
        title: getTranslation(" Supplier ", " Fournisseurs ", " Lieferanten "),
        icon: RiProfileFill,
        href: "/suppliers",
      },
      // {
      //   title: getTranslation(" Report ", " Fournisseurs ", " Lieferanten "),
      //   icon: RiGitRepositoryFill,
      //   href: "/reports",
      // },

      {
        title: getTranslation(" Setting ", " Param�tres ", " Einstellungen"),
        icon: RiSettings2Fill,
        href: "/setting/email",
      },

      // {
      //   title: "Account",
      //   icon: RiAccountPinBoxLine,
      //   href: "/account",
      //   items: [
      //     {
      //       title: "My Account",
      //       href: "/account/profile",
      //     },

      //   ],
      // },
    ],
  },
];

export default navConfig;
