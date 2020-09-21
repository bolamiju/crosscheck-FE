import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import ForgotPassword from "./component/auth/ForgotPassword";
import ResetPassword from "./component/auth/ResetPassword";
import AccountVerification from "./component/auth/AccountVerification";
import { Route } from "react-router-dom";
import "./component/auth/auth.css";

function App() {
  return (
    <Provider store={store}>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Login} />
      <Route exact path="/verify/:email" component={AccountVerification} />
      <Route exact path="/forgotpassword" component={ForgotPassword} />
      <Route exact path="/reset/:token" component={ResetPassword} />
    </Provider>
  );
}

export default App;
