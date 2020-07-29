import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./css/style.css";

try {
  const app = document.getElementById("app");
  const renderOrHydrate = app.innerHTML.trim().length ? "hydrate" : "render";
  ReactDOM[renderOrHydrate](
    <BrowserRouter>
      <Routes />
    </BrowserRouter>,
    app
  );
} catch (e) {
  console.log(e);
}
