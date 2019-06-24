import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import serialize from "serialize-javascript";

import { PostProvider } from "./client/context";
import { StaticRouter } from "react-router-dom";
import Routes from "./client/Routes";
import axios from "axios";

const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.get("*", (req, res) => {
  //const post = { name: "bhuhtiagl" };
  let post;
  const getPosts = () => {
    try {
      return axios.get(
        "https://bhautikng143.000webhostapp.com/wp-json/wp/v2/posts/?_embed&per_page=5&order=desc&orderby=date"
      );
      // http://localhost/wordpress/wp-json/wp/v2/posts/?per_page=100&order=desc&orderby=date
      //https://rtcamp-blogapp.000webhostapp.com/wp-json/wp/v2/posts/?per_page=100&order=desc&orderby=date
    } catch (error) {
      console.log(error);
    }
  };

  getPosts()
    .then(postData => {
      post = postData.data;
      const app = renderToString(
        <StaticRouter location={req.url} context={{}}>
          <PostProvider posts={post}>
            <Routes />
          </PostProvider>
        </StaticRouter>
      );

      const html = `<!DOCTYPE html>
  <html>
      <head> 
      <base href="/"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
      </head>
      <body>
          <div id="root">${app}</div>
          <script>window.__INITIAL_DATA__ = ${serialize(post)}</script>
          <script src="bundle.js"></script>
      </body>
  </html>`;
      res.send(html);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

{
  /* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script> */
}
