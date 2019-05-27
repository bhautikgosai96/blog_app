import React, { Component } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postStore } from "../../actions";

class Posts extends Component {
  componentDidMount() {
    this.props.postStore();
  }

  renderPosts() {
    return this.props.posts.map(p => {
      return <h4 key={p.id}>{p.title.rendered}</h4>;
    });
  }

  render() {
    return (
      <div>
        All posts
        {/* {this.renderPosts()} */}
        <>
          <Row className="justify-content-md">
            {this.props.posts.map(post => (
              <Col key={post.id} md="auto">
                <Card bg="secondary" text="white" style={{ width: "18rem" }}>
                  <Card.Header>{post.id}</Card.Header>
                  <Card.Body>
                    {" "}
                    <Card.Title>{post.title.rendered}</Card.Title>
                    <Card.Text>
                      <Link to={`/fullPost/${post.id}`}>Full Post</Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </Col>
            ))}
          </Row>
        </>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

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
  { postStore }
)(Posts);
