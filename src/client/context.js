import React, { Component } from "react";

const PostContext = React.createContext();

class PostProvider extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    post: this.props.posts,
    activePage: 1,
    categoryPage: false
  };

  setSinglePost = () => {
    this.setState({ activePage: 1, categoryPage: true });
  };

  setActivePage = (pgNumber, type) => {
    //console.log("setActivePage", this.props.match.params);
    if (type === "prev") {
      if (pgNumber >= 2) {
        this.setState({ activePage: pgNumber - 1 });
      }
    }
    if (type === "next") {
      const totalPage = this.state.post.length / 10;
      if (pgNumber <= totalPage - 1) {
        this.setState({ activePage: pgNumber + 1 });
      }
    }
    if (type === "normal") {
      this.setState({ activePage: pgNumber });
    }
    if (type === "home") {
      this.setState({ activePage: pgNumber });
    }
  };
  render() {
    return (
      <PostContext.Provider
        value={{
          ...this.state,
          setSinglePost: this.setSinglePost,
          setActivePage: this.setActivePage
        }}
      >
        {this.props.children}
      </PostContext.Provider>
    );
  }
}

const PostConsumer = PostContext.Consumer;

export { PostProvider, PostConsumer };
