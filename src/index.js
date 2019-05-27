import "babel-polyfill";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Routes from "./client/Routes";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../src/client/reducers";
import { renderRoutes } from "react-router-config";
import Navbar from "./client/components/Navbar/Navbar";

const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

app.get("*", (req, res) => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>
          <Navbar />
          {renderRoutes(Routes)}
        </div>
      </StaticRouter>
    </Provider>
  );
  const html = `
    <html>
      <head>
      <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    />

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
        <script>window.INITITAL_STATE = ${JSON.stringify(
          store.getState()
        )}</script>
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// "dev:server": "nodemon build/bundle.js"
