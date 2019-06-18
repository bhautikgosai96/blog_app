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
                <div className="container">
                  <div className="row">
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
                  </div>
                </div>
              </>
            );
          }}
        </PostConsumer>
      </React.Fragment>
    );
  }
}
export default FullPost;
