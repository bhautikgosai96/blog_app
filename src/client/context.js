import React, { Component } from "react";
import axios from "axios";

const PostContext = React.createContext();

class PostProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    post: this.props.posts.postArray,
    totalPage: this.props.posts.totalPage,
    activePage: this.props.posts.activePage,
    categoryId: this.props.posts.categoryId,
    categoryPage: false,
    isLoading: false
  };

  setSinglePost = () => {
    this.setState({ activePage: 1, categoryPage: true });
  };

  setCategory = cId => {
    this.setState({ isLoading: true });

    axios
      .get(
        "https://bhautikng143.000webhostapp.com/wp-json/wp/v2/posts?_embed&categories=" +
          cId +
          "&per_page=10&page=1" +
          "&order=desc&orderby=date"
      )
      .then(response => {
        this.setState({
          activePage: 1,
          post: response.data,
          totalPage: response["headers"]["x-wp-totalpages"],
          isLoading: false,
          categoryId: cId
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  setActivePage = (pgNumber, type, pageType, cId) => {
    this.setState({ isLoading: true });
    let url;
    if (pageType === "Home") {
      url =
        "https://bhautikng143.000webhostapp.com/wp-json/wp/v2/posts/?_embed&per_page=10&page=" +
        pgNumber +
        "&order=desc&orderby=date";
    } else {
      url =
        "https://bhautikng143.000webhostapp.com/wp-json/wp/v2/posts?_embed&categories=" +
        cId +
        "&per_page=10&page=" +
        pgNumber +
        "&order=desc&orderby=date";
    }
    axios
      .get(url)
      .then(response => {
        if (type === "prev") {
          if (pgNumber >= 1) {
            this.setState({
              activePage: pgNumber,
              post: response.data,
              totalPage: response["headers"]["x-wp-totalpages"],
              isLoading: false,
              categoryId: cId
            });
          }
        }
        if (type === "next") {
          const totalPage = this.state.totalPage;
          if (pgNumber <= totalPage) {
            this.setState({
              activePage: pgNumber,
              post: response.data,
              totalPage: response["headers"]["x-wp-totalpages"],
              isLoading: false,
              categoryId: cId
            });
          }
        }
        if (type === "normal") {
          this.setState({
            activePage: pgNumber,
            post: response.data,
            totalPage: response["headers"]["x-wp-totalpages"],
            isLoading: false,
            categoryId: cId
          });
        }
        if (type === "home") {
          this.setState({
            activePage: pgNumber,
            post: response.data,
            totalPage: response["headers"]["x-wp-totalpages"],
            isLoading: false,
            categoryId: cId
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <PostContext.Provider
        value={{
          ...this.state,
          setSinglePost: this.setSinglePost,
          setActivePage: this.setActivePage,
          setCategory: this.setCategory
        }}
      >
        {this.props.children}
      </PostContext.Provider>
    );
  }
}

const PostConsumer = PostContext.Consumer;

export { PostProvider, PostConsumer };
