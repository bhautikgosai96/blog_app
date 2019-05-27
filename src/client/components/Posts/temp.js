import React, { Component } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  onStore(e) {
    console.log(e);
    this.props.onStorePosts(e);
  }
  componentDidMount() {
    axios
      .get("http://localhost/wordpress/wp-json/wp/v2/posts")
      .then(response => {
        console.log(response.data);
        this.setState({ posts: response.data });
        this.props.onAllPostsStore(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <Row className="justify-content-md">
          {this.state.posts.map(post => (
            <Col key={post.id} md="auto">
              <Card bg="secondary" text="white" style={{ width: "18rem" }}>
                <Card.Header>{post.id}</Card.Header>
                <Card.Body>
                  {" "}
                  <Card.Title>{post.title.rendered}</Card.Title>
                  <Card.Text>
                    <Link
                      to={`/fullPost/${post.id}`}
                      onClick={e => this.onStore(post)}
                    >
                      Full Post
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
//export default Posts;
const mapStateToProps = state => {
  return {
    ps: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStorePosts: postName => {
      dispatch({ type: "STORE_POST", val: postName });
    },
    onAllPostsStore: allPost => {
      dispatch({ type: "ALL_POST_STORE", val: allPost });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
