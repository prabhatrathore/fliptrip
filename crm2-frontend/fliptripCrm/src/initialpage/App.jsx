import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
//Error Page
import Error404 from "../MainPage/Pages/ErrorPage/error404";
import Error500 from "../MainPage/Pages/ErrorPage/error500";
import uicomponents from "../MainPage/UIinterface/components";
import { admin } from "../utils/roles";
import ApplyJobs from "./ApplyJob";
import ForgotPassword from "./forgotpassword";
import LockScreen from "./lockscreen";
// We will create these two pages in a moment
//Authendication
import LoginPage from "./loginpage";
import OTP from "./otp";
import RegistrationPage from "./RegistrationPage";
import chatlayout from "./Sidebar/chatlayout";
//Main App
import DefaultLayout from "./Sidebar/DefaultLayout";
import Emaillayout from "./Sidebar/emaillayout";
import Settinglayout from "./Sidebar/Settinglayout";
import Tasklayout from "./Sidebar/tasklayout";
import Quotation from "../_components/quotation/Quotation";
// {
//     if (location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("forgotpassword") || location.pathname.includes("otp") || location.pathname.includes("lockscreen")) {
//       // $('body').addClass('account-page');
//     } else if (location.pathname.includes("error-404") || location.pathname.includes("error-500")) {
//       $("body").addClass("error-page");
//     }
//   }

const App = () => {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const role = useSelector((state) => state.auth.role);

  return (
    <Switch>
      {isAuthorized ? (
        <>
          {role == admin ? (
            <Redirect path="/" exact to="/app/main/dashboard" />
          ) : (
            <Redirect path="/" exact to="/app/main/employee-dashboard" />
          )}

          <Route path="/app" component={DefaultLayout} />
        </>
      ) : (
        <>
          <Route path="/" component={LoginPage} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/otp" component={OTP} />
          <Route path="/lockscreen" component={LockScreen} />
          <Route path="/applyjob" component={ApplyJobs} />

          <Route path="/settings" component={Settinglayout} />
          <Route path="/tasks" component={Tasklayout} />
          <Route path="/email" component={Emaillayout} />
          <Route path="/conversation" component={chatlayout} />

          <Route path="/ui-components" component={uicomponents} />
        </>
      )}
      <Route path="/error-404" component={Error404} />
      <Route path="/error-500" component={Error500} />
    </Switch>
  );
};
export default App;
