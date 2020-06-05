import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Content from "./Board/Content";

function App() {
  return (
    <div>
      <header>APP</header>
      <Content />
    </div>
  );
}

export default App;
