import React from "react";
//import { Route } from "react-router-dom";
import App from "./App";
import Posts from "./components/Posts/Posts";
import Navbar from "./components/Navbar/Navbar";
import AboutMe from "./components/AboutMe/AboutMe";
import FullPost from "./components/FullPost/FullPost";

export default [
  {
    path: "/",
    component: App,
    exact: true
  },
  {
    path: "/posts",
    component: Posts,
    exact: true
  },
  {
    path: "/aboutMe",
    component: AboutMe,
    exact: true
  },
  {
    path: "/fullPost/:id",
    component: FullPost,
    exact: true
  }
];
// const Routes = () => {
//   return (
//     <>
//       <Navbar />
//       <Route exact path="/" component={App} />
//       <Route exact path="/posts" component={Posts} />
//       <Route exact path="/aboutMe" component={AboutMe} />
//       <Route exact path="/fullPost/:id" component={FullPost} />
//     </>
//   );
// };

// export default Routes;
