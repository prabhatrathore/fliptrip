import React, { Component, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// We will create these two pages in a moment
//Authendication
import LoginPage from "./loginpage";
import RegistrationPage from "./RegistrationPage";
import ForgotPassword from "./forgotpassword";
import OTP from "./otp";
import LockScreen from "./lockscreen";
import ApplyJobs from "./ApplyJob";

//Main App
import DefaultLayout from "./Sidebar/DefaultLayout";
import Settinglayout from "./Sidebar/Settinglayout";
import Tasklayout from "./Sidebar/tasklayout";
import Emaillayout from "./Sidebar/emaillayout";
import chatlayout from "./Sidebar/chatlayout";
import { useDispatch, useSelector } from "react-redux";

import uicomponents from "../MainPage/UIinterface/components";
//Error Page
import Error404 from "../MainPage/Pages/ErrorPage/error404";
import Error500 from "../MainPage/Pages/ErrorPage/error500";

// {
//     if (location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("forgotpassword") || location.pathname.includes("otp") || location.pathname.includes("lockscreen")) {
//       // $('body').addClass('account-page');
//     } else if (location.pathname.includes("error-404") || location.pathname.includes("error-500")) {
//       $("body").addClass("error-page");
//     }
//   }

const App = () => {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  useEffect(() => {}, []);

  return (
    <Switch>
      {isAuthorized ? (
        <>
          <Redirect path="/" exact to="/app/main/dashboard" />

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
