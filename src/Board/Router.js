import React from "react";
import Boards from "./Boards";
import TasksCards from "./List/TasksCards/TasksCard";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "./ExtraComponents/PageNotFound";
import ContainerDescription from "./List/TasksCards/Description/Description";
import ConfirmDelete from "./ExtraComponents/ConfirmDelete";

let Router = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Boards} />
        <Route path="/board/:boardId" component={TasksCards} />
        <Route exact path="/2222" component={ConfirmDelete} />
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

export default Router;
