import React, { useEffect } from "react";
import Boards from "./Boards";
import Case from "./ProgresList/CaseList/Case";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";

let Content = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Boards} />
      <Route exact path="/board/:boardId" component={Case} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default Content;
