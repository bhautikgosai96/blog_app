import React, { Component } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postStore } from "../../actions";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      activePage: 1,
      tempArray: [],
      dis: "disabled",
      totalPage: 0,
      per_page: 10
    };
  }
  componentDidMount() {
    this.props.postStore();
  }

  pagination() {
    let count = 1;
    let page = 1;
    const temp = this.props.posts;

    temp.map(posts => {
      posts["page_number"] = page;
      if (count >= 10) {
        count = 1;
        page = page + 1;
      } else {
        count = count + 1;
      }
      return 0;
    });

    console.log(temp);
  }

  changePage(pgNumber, type) {
    if (type === "prev") {
      if (pgNumber >= 2) {
        this.setState({ activePage: pgNumber - 1, dis_prev: "disabled" });
      }
    }
    if (type === "next") {
      if (pgNumber <= this.props.totalPage - 1) {
        this.setState({ activePage: pgNumber + 1, dis_prev: "disabled" });
      }
    }
    if (type === "normal") {
      this.setState({ activePage: pgNumber, dis_prev: "disabled" });
    }
  }
  showContent() {
    return this.props.posts.map(posts => {
      return this.state.activePage === posts.page_number ? (
        <Col key={posts.id} md="auto">
          <Card bg="secondary" text="white" style={{ width: "18rem" }}>
            <Card.Header>{posts.id}</Card.Header>
            <Card.Body>
              {" "}
              <Card.Title>{posts.title.rendered}</Card.Title>
              <Card.Text>
                {/* <Link to={`/fullPost/${post.id}`}>Full Post</Link> */}
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </Col>
      ) : (
        <></>
      );
    });
  }
  render() {
    const actpg = this.state.activePage;
    const pageArray = [];
    for (let i = 1; i <= this.props.totalPage; i++) {
      pageArray.push(i);
    }
    const renderpage = pageArray.map(number => {
      return actpg === number ? (
        <li className="page-item active" key={number} id={number}>
          <button
            type="button"
            className="page-link"
            onClick={this.changePage.bind(this, number, "normal")}
          >
            {number}
          </button>
        </li>
      ) : (
        <li className="page-item" key={number} id={number}>
          <button
            type="button"
            className="page-link"
            onClick={this.changePage.bind(this, number, "normal")}
          >
            {number}
          </button>
        </li>
      );
    });
    return (
      <div style={{ marginTop: "2%" }}>
        {this.pagination()}
        <>
          <Row className="justify-content-md">{this.showContent()}</Row>
          <ul className="pagination" style={{ marginLeft: "40%" }}>
            <li className="page-item">
              <button
                type="button"
                className="page-link"
                id="prev"
                onClick={this.changePage.bind(
                  this,
                  this.state.activePage,
                  "prev"
                )}
              >
                Prev
              </button>
            </li>
            {renderpage}
            <li>
              <button
                type="button"
                className="page-link"
                onClick={this.changePage.bind(
                  this,
                  this.state.activePage,
                  "next"
                )}
              >
                Next
              </button>
            </li>
          </ul>
          {/* <Row className="justify-content-md">
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
          </Row> */}
        </>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    totalPage: Math.ceil(state.posts.length / 10),
    activePage: 1
  };
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
