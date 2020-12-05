import React from "react";
import Boards from "./Boards";
import TasksCard from "./List/TasksCards/DragLogic";
import { Route, Switch } from "react-router-dom";
import PageNotFound from ".././ExtraComponents/PageNotFound";
import ContainerDescription from "./List/TasksCards/Description/Description";
import SignIn from "../Authorization/SignIn";
import ProtectedRoute from "../Authorization/ProtectedRoute";
import SignUp from "../Authorization/SignUp";
import AuthorizedRoute from "../Authorization/AuthorizedRoute";
import RecoveryPassword from "../Authorization/RecoveryPassword";
import ForcedLogOut from "../Authorization/ForcedLogOut";

let Router = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/" component={() => <Boards />} />
        <Route exact path="/authorization/forcedLogOut" component={() => <ForcedLogOut />} />
        <ProtectedRoute path="/board/:boardId" component={() => <TasksCard />} />
        <AuthorizedRoute exact path="/authorization/login" component={SignIn} />
        <AuthorizedRoute exact path="/authorization/signup" component={SignUp} />
        <AuthorizedRoute
          exact
          path="/authorization/forgotPassword"
          component={RecoveryPassword}
        />
        <ProtectedRoute component={PageNotFound} />
      </Switch>
      <Switch>
        <ProtectedRoute
          exact
          path="/board/:boardId/description/:descriptionId"
          component={() => <ContainerDescription />}
        />
      </Switch>
    </>
  );
};

export default Router;
