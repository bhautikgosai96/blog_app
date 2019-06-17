import React, { Component } from "react";
import { PostConsumer } from "../context";

class FullPost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <PostConsumer>
          {value => {
            let temp = value.post;

            const post = temp.find(
              post => post.id === parseInt(this.props.match.params.id)
            );

            return (
              <>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </>
            );
          }}
        </PostConsumer>
      </React.Fragment>
    );
  }
}
export default FullPost;
