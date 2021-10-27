import React from "react";
import { Route, Switch } from "react-router-dom";
import Boards from "./Pages/Boards/Boards";
import TasksCard from "./Pages/Cards/DragLogic";
import PageNotFound from "./ExtraComponents/PageNotFound/PageNotFound";
import ContainerDescription from "./Pages/Cards/Description/Description";
import SignIn from "./Authorization/SignIn";
import ProtectedRoute from "./Authorization/ProtectedRoute";
import SignUp from "./Authorization/SignUp";
import AuthorizedRoute from "./Authorization/AuthorizedRoute";
import RecoveryPassword from "./Authorization/RecoveryPassword";
import ForcedLogOut from "./Authorization/ForcedLogOut";

const Router = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/" component={Boards} />
      <Route exact path="/authorization/forcedLogOut" component={ForcedLogOut} />
      <ProtectedRoute path="/board/:boardId" component={TasksCard} />
      <AuthorizedRoute exact path="/authorization/login" component={SignIn} />
      <AuthorizedRoute exact path="/authorization/signup" component={SignUp} />
      <AuthorizedRoute exact path="/authorization/forgotPassword" component={RecoveryPassword} />     
      <ProtectedRoute component={PageNotFound} />
    </Switch>
    <Switch>
      <ProtectedRoute
        exact
        path="/board/:boardId/description/:descriptionId"
        component={ContainerDescription}
      />
    </Switch>
  </>
);

export default Router;
