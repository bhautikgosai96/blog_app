import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { postStore } from "../../actions";

class FullPost extends Component {
  constructor(props) {
    console.log(props.match.params.id);
    super(props);
    this.state = {
      p: []
    };
  }

  // componentWillMount() {
  //   this.setState({
  //     p: [...this.state.p, this.props.ps]
  //   });
  // }

  render() {
    const temp = this.props.ps;
    console.log(temp);
    const post = temp.find(
      post => post.id === parseInt(this.props.match.params.id)
    );
    console.log(post);
    return (
      <>
        {/* <h4>{this.props.match.params.id}</h4>
        {console.log(this.props.ps)} */}
        <h2>{post.title.rendered}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </>
    );
  }
}

//export default FullPost;
const mapStateToProps = state => {
  // console.log(state);
  return {
    ps: state.posts
  };
};

export default connect(
  mapStateToProps,
  { postStore }
)(FullPost);
