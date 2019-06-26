import React, { Component } from "react";
import { PostConsumer } from "../context";
import { Row, Container } from "react-bootstrap";

import "./style.css";
class FullPost extends Component {
  render() {
    return (
      <React.Fragment>
        <PostConsumer>
          {value => {
            let temp = value.post;

            let post;
            if (temp.length > 0) {
              post = temp.find(
                post => post.id === parseInt(this.props.match.params.id)
              );
            } else {
              post = temp;
            }

            return (
              <>
                <Container>
                  <Row className="justify-content-md">
                    <h2
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered
                      }}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.content.rendered
                      }}
                    />
                  </Row>
                </Container>
              </>
            );
          }}
        </PostConsumer>
      </React.Fragment>
    );
  }
}
export default FullPost;
