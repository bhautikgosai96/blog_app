import React, { Component } from "react";
import { PostConsumer } from "../context";
import { Card, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import axios from "axios";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <PostConsumer>
          {value => {
            let pp = value.post;
            let loading = value.isLoading;
            let link;
            pp.map(posts => {
              link = posts.excerpt.rendered;
              let linkArray = link.split("<div>");
              posts["excerpt"]["rendered"] = linkArray[0];
            });

            if (loading) {
              return <h1>Loading....</h1>;
            } else {
              return (
                <Container>
                  <Row className="justify-content-md-center">
                    {pp.map(posts => {
                      return (
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
                                  return name.map(n => {
                                    return (
                                      <Link
                                        to={`/category/${n.id}/1`}
                                        onClick={() => {
                                          value.setCategory(n.id);
                                        }}
                                      >
                                        {n.name}
                                      </Link>
                                    );
                                  });
                                })}
                              </p>{" "}
                            </Card.Footer>
                          </Card>
                          <br />
                        </Col>
                      );
                    })}
                  </Row>
                  <Pagination pageName="Home" />
                </Container>
              );
            }
          }}
        </PostConsumer>
      </React.Fragment>
    );
  }
}
export default Home;
