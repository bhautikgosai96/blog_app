import React, { Component } from "react";
import { PostConsumer } from "../context";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    //console.log(this.props.match.params.categoryId);
    axios
      .get(
        "https://rtcamp-blogapp.000webhostapp.com/wp-json/wp/v2/posts/?_embed=" +
          this.props.match.params.categoryId +
          "&per_page=100&order=desc&orderby=date"
      )
      .then(response => {
        console.log(response.data);
        this.setState({ category: response.data, isLoaded: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  changeCategory = id => {
    console.log("params ", this.props.match.params.categoryId);
    console.log("props ", id);
    axios
      .get(
        "https://rtcamp-blogapp.000webhostapp.com/wp-json/wp/v2/postss/?_embed=" +
          id +
          "&per_page=100&order=desc&orderby=date"
      )
      .then(response => {
        console.log(response.data);
        this.setState({ category: response.data, isLoaded: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <PostConsumer>
          {value => {
            let count = 1;
            let page = 1;
            const temp = this.state.category;
            let link;
            let actpg = value.activePage;

            if (this.props.match.params.pageNumber) {
              actpg = this.props.match.params.pageNumber;
            } else {
              actpg = value.activePage;
            }
            temp.map(posts => {
              posts["page_number"] = page;
              link = posts.excerpt.rendered;

              let linkArray = link.split("<div>");
              //console.log(linkArray[0]);
              posts["excerpt"]["rendered"] = linkArray[0];
              if (count >= 10) {
                count = 1;
                page = page + 1;
              } else {
                count = count + 1;
              }
              return 0;
            });
            if (this.state.isLoaded) {
              return (
                <div>
                  {}
                  <Row className="justify-content-md">
                    {temp.map(posts => {
                      return parseInt(actpg) === parseInt(posts.page_number) ? (
                        <Col key={posts.id} md="auto">
                          <Card
                            bg="secondary"
                            text="white"
                            style={{ width: "18rem" }}
                          >
                            <Card.Header
                              dangerouslySetInnerHTML={{
                                __html: posts.title.rendered
                              }}
                            />
                            <Card.Body>
                              {/* {console.log(posts.excerpt.rendered)} */}
                              <Card.Title
                                dangerouslySetInnerHTML={{
                                  __html: posts.excerpt.rendered
                                }}
                              />
                              <Card.Text>
                                <Link to={`/fullPost/${posts.id}`}>
                                  Full Post
                                </Link>
                              </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                              <p>
                                <span style={{ color: "white" }}>
                                  {" "}
                                  Category:-
                                </span>{" "}
                                {posts._embedded["wp:term"].map(name => {
                                  console.log(name);
                                  return name.map(n => {
                                    return (
                                      <Link
                                        to={`/category/${n.id}`}
                                        onClick={() => {
                                          this.changeCategory(n.id);
                                        }}
                                      >
                                        {n.name}
                                      </Link>
                                    );
                                  });
                                })}
                                {/* {posts.cat_name.map(name => {
                                  return (
                                    <Link
                                      to={`/category/${name.id}`}
                                      onClick={() => {
                                        this.changeCategory(name.id);
                                      }}
                                    >
                                      {name.name}
                                    </Link>
                                  );
                                })} */}
                              </p>{" "}
                            </Card.Footer>
                          </Card>
                          <br />
                        </Col>
                      ) : (
                        <></>
                      );
                    })}
                  </Row>

                  <Pagination
                    category={this.state.category}
                    pageNmae="category"
                  />
                </div>
              );
            } else {
              return <h3>Loading.....</h3>;
            }
          }}
        </PostConsumer>
      </React.Fragment>
    );
  }
}
export default Home;
