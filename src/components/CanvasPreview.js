import React from "react";
import { connect } from "react-redux";
import { editError } from "../actions";

class CanvasPreview extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.iframeRef = React.createRef();
    this.imgRef = React.createRef();

    window.addEventListener("message", this.receiveMessage, false);
  }

  receiveMessage = event => {
    if (!event.isTrusted) {
      return;
    }
    this.imgRef.current.src = event.data;
  };

  onClickCanvas = e => {
    const a = document.createElement("a");
    let image = this.canvasRef.current.toDataURL("image/png");
    image = image.replace("image/png", "image/octet-stream");
    a.setAttribute("download", "wallpaper.png");
    a.setAttribute("href", image);
    a.click();
  };

  //TODO: Draw canvas on state update
  componentDidMount() {
    console.log("Canvas MOUNTED");
    this.iframeRef.current.contentWindow.postMessage(
      JSON.stringify(this.props.wallpaper),
      "*"
    );
  }

  componentDidUpdate() {
    console.log("Canvas UPDATED");
    this.iframeRef.current.contentWindow.postMessage(
      JSON.stringify(this.props.wallpaper),
      "*"
    );
  }

  render() {
    const { height, width, ratio } = this.props.wallpaper;

    return (
      <div>
        <h4>CanvasPreview</h4>
        <div className="ui center aligned segment">
          <div style={{ height: "100%", display: "block" }}>
            <iframe
              src="./canvasIframe.html"
              sandbox="allow-scripts"
              ref={this.iframeRef}
              style={{ display: "none" }}
            />
            <img ref={this.imgRef} style={{ width: "100%" }} />
          </div>
          <div className="">
            <span>{`${height} x ${width}`}</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { wallpaper: state.canvasReducer.wallpaper };
};

export default connect(
  mapStateToProps,
  { editError }
)(CanvasPreview);
