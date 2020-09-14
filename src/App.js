import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import { Route } from "react-router-dom";
import "./component/auth/auth.css";

function App() {
  return (
    <Provider store={store}>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Provider>
  );
}

export default App;
