import axios from "axios";

export const POST_STORE = "post_store";

export const postStore = () => async dispatch => {
  const res = await axios.get(
    "https://rtcamp-blogapp.000webhostapp.com/wp-json/wp/v2/posts/?per_page=100&order=desc&orderby=date"
  );
  //https://rtcamp-blogapp.000webhostapp.com/wp-json/wp/v2/posts/
  //https://rtcamp-blogapp.000webhostapp.com/wp-json/wp/v2/posts/?per_page=100&order=desc&orderby=date
  //http://localhost/wordpress/wp-json/wp/v2/posts
  dispatch({
    type: POST_STORE,
    payload: res
  });
};
//"dev:serve": "nodemon build/bundle.js",
//  "start": "node build/bundle.js",
//"test": "jest"
