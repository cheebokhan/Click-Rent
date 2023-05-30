import React, { Suspense, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
// import SplashScreen from "./components/SplashScreen"
import Auth from "./components/Auth";
import AuthGuard from "./components/AuthGuard";
//Website Layouts
import AppLayout from "./layout";

//Auth Views
import Login from "./views/auth/Login";
import ForgetPassword from "./views/auth/ForgetPassword";

//Account Views
import MyAccount from "./views/account/myAccount";

//importing imp Views
import { Buildings } from "./views/buildings";
import { Appartments } from "./views/buildings/component/apartments";
import { Tanents } from "./views/tanents";
import { Details } from "./views/tanents/components/details";
import { Dues } from "./views/dues";
import { Bank } from "./views/bank";
import { Suppliers } from "./views/suppliers";
import { PreviousDues } from "./views/dues/components/previousDues";
import { Dashboard } from "./views/dashboard";
import {
  AllBuildingsReport,
  BuildingReport,
} from "./views/buildings/component/reports";
import { BankSettingList } from "./views/setting/bankSettings/bankSettingList";
import { SettingList } from "./views/setting/settingsList";
import { Upgrade } from "./views/common/Upgrade";

const routesConfig = [
  {
    path: "/login",
    exact: true,
    component: () => <Login />,
  },
  {
    path: "/login/:token",
    exact: true,
    component: () => <Login autologin />,
  },
  {
    path: "/forget_password",
    exact: true,
    component: () => <ForgetPassword />,
  },

  {
    path: "/",
    layout: AppLayout,
    guard: Auth,
    //bootstrap: AuthGuard,
    childrens: [
      {
        path: "/",
        exact: true,
        component: () => <Dashboard />,
      },
      {
        path: "/dashboard",
        exact: true,
        component: () => <Dashboard />,
      },
      {
        path: "/account/profile",
        exact: true,
        component: () => <MyAccount />,
      },
      {
        path: "/buildings",
        exact: true,
        component: () => <Buildings />,
      },
      {
        path: "/buildings/:buildingId/apartments",
        exact: true,
        component: () => <Appartments />,
      },

      ////  Buolding Report URLs ///
      {
        path: "/buildingReport",
        exact: true,
        component: () => <BuildingReport />,
      },
      {
        path: "/allBuildingsReport",
        exact: true,
        component: () => <AllBuildingsReport />,
      },
      {
        path: "/tanents",
        exact: true,
        component: () => <Tanents />,
      },
      {
        path: "/tanents/:tenantId/details",
        exact: true,
        component: () => <Details />,
      },
      {
        path: "/dues",
        childrens: [
          {
            path: "/dues/duesGenerated",
            exact: true,
            component: () => <Dues />,
          },
          {
            path: "/dues/previousDues",
            exact: true,
            component: () => <PreviousDues />,
          },
        ],
      },

      {
        path: "/bank",
        exact: true,
        component: () => <Bank />,
      },
      {
        path: "/suppliers",
        exact: true,
        component: () => <Suppliers />,
      },

      {
        path: "/setting/email",
        exact: true,
        component: () => <SettingList />,
      },
      {
        path: "/settings/bank",
        exact: true,
        component: () => <BankSettingList />,
      },
      {
        component: () => <div>Not Found</div>,
      },
    ],
  },

  {
    component: () => <div>Not Found</div>,
  },
];

const renderRoutes = (routes) => {
  return routes ? (
    <Suspense fallback={<h1>loading...</h1>}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;
          const Bootstrap = route.bootstrap || Fragment;

          return (
            <Route
              exact={route.exact}
              path={route.path}
              key={i}
              render={(props) => (
                <Layout>
                  <Guard>
                    <Bootstrap>
                      {route.childrens ? (
                        renderRoutes(route.childrens)
                      ) : (
                        <Component {...props} />
                      )}
                    </Bootstrap>
                  </Guard>
                </Layout>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;
};

const AppRoutes = () => {
  return renderRoutes(routesConfig);
};

export default AppRoutes;
