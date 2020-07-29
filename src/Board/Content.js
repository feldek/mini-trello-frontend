import React from "react";
import Boards from "./Boards";
import TasksCards from "./List/TasksCards/TasksCard";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import ContainerDescription from "./List/TasksCards/Description/Description";

let Content = (props) => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Boards} />
        <Route path="/board/:boardId" component={TasksCards} />
        <Route component={PageNotFound} />
      </Switch>
      <Switch>
        <Route
          exact
          path="/board/:boardId/description/:descriptionId"
          component={ContainerDescription}
        />
      </Switch>
    </>
  );
};

export default Content;
