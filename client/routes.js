import React, { Component } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom"; //Route
import Waiting from "./components/waiting";
import Delay from "./components/delay";
import News from "./components/news";
import LayoutRoute from "./layoutRoute";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <LayoutRoute path={"/waiting"} exact component={Waiting} />
        <LayoutRoute path={"/delay"} exact component={Delay} />
        <LayoutRoute path={"/"} exact component={News} />
      </Switch>
    );
  }
}

export default withRouter(Routes);
