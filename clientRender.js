import path from "path";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Routes from "./client/routes";

const clientRenderer = (req, res) => {
  console.log("In Client Render");
  const filePath = path.resolve(__dirname, "..", "build", "index.html");
  fs.readFile(filePath, "utf8", async (err, htmlData) => {
    if (err) {
      return res.status(404).end();
    }
    const context = {};

    //  get redux store
    const state = store.getState();
    console.log(req.url);
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Routes store={store} />
        </StaticRouter>
      </Provider>
    );
    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(302, context.url);
    } else {
      // we're good, send the response
      const markupWithApp = `<div id="app">${markup}</div>`;
      const RenderedApp = htmlData.replace(
        '<div id="app"></div>',
        markupWithApp
      );
      const RenderedAppWithState = RenderedApp.replace(
        '"__SERVER_STATE__"',
        JSON.stringify(state)
      );
      res.send(RenderedAppWithState);
    }
  });
};

export default clientRenderer;
