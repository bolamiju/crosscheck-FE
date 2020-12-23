import React from "react";
import { Provider } from "react-redux";
import { Redirect } from "react-router-dom";
import store from "./store";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import ForgotPassword from "./component/auth/ForgotPassword";
import ResetPassword from "./component/auth/ResetPassword";
import AccountVerification from "./component/auth/AccountVerification";
import MainContent from "./component/dashboard/MainContent";
import LandingPage from "./component/LandingPage";
import Terms from "./component/Terms";
import EmailActivation from './component/dashboard/EmailActivation';
import NotFound from './component/dashboard/NotFound'
import { Route } from "react-router-dom";
import "./component/auth/auth.css";

function App() {
  const withAuthCheck = (Component, props) => {
    if (JSON.parse(localStorage.getItem("user"))) {
      return <Component {...props} />;
    }
    return <Redirect to="/" />;
  };
  return (
    <Provider store={store}>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Login} />
      <Route
        exact
        path="/dashboard/:id"
        component={(props) => withAuthCheck(MainContent, props)}
      />
      <Route exact path="/verify/:email" component={AccountVerification} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route exact path="/reset/:token" component={ResetPassword} />
      <Route
        exact
        path="/new"
        component={(props) => withAuthCheck(MainContent, props)}
      />
      <Route
        exact
        path="/transcript"
        component={(props) => withAuthCheck(MainContent, props)}
      />
      <Route
        exact
        path="/history"
        component={(props) => withAuthCheck(MainContent, props)}
      />
      <Route
        exact
        path="/receipts"
        component={(props) => withAuthCheck(MainContent, props)}
      />
      <Route exact path="/home" component={LandingPage} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/active" component={EmailActivation} />
      <Route component={NotFound} />
    </Provider>
  );
}

export default App;
