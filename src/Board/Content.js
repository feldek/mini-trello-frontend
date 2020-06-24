import React from "react";
import Boards from "./Boards";
import TasksCards from "./List/TasksCards/TasksCard";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";

let Content = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Boards} />
      <Route exact path="/board/:boardId" component={TasksCards} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default Content;
