import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import ForgotPassword from "./component/auth/ForgotPassword";
import ResetPassword from "./component/auth/ResetPassword";
import AccountVerification from "./component/auth/AccountVerification";
import MainContent from "./component/dashboard/MainContent";
import LandingPage from "./component/LandingPage";
import Terms from "./component/Terms";
import Receipts from './component/dashboard/Receipts';
import { Route } from "react-router-dom";
import "./component/auth/auth.css";

// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={MainContent} />
      <Route exact path="/verify/:email" component={AccountVerification} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route exact path="/reset/:token" component={ResetPassword} />
      <Route exact path="/new" component={MainContent} />
      <Route exact path="/transcript" component={MainContent} />
      <Route exact path="/home" component={LandingPage} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path = "/receipts" component={Receipts} />
    </Provider>
  );
}

export default App;
