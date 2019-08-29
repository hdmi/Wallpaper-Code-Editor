import React from "react";
import { connect } from "react-redux";
import { editError } from "../actions";

class CanvasPreview extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.iframeRef = React.createRef();
    this.imgRef = React.createRef();
  }

  onMessageReceived = event => {
    if (!event.isTrusted) {
      return;
    }
    this.imgRef.current.src = event.data;
  };

  onImageClick = e => {
    const a = document.createElement("a");
    const image = this.imgRef.current.src.replace(
      "image/png",
      "image/octet-stream"
    );
    a.setAttribute("download", "wallpaper.png");
    a.setAttribute("href", image);
    a.click();
  };

  componentDidMount() {
    window.addEventListener("message", this.onMessageReceived, false);

    this.iframeRef.current.contentWindow.postMessage(
      JSON.stringify(this.props.wallpaper),
      "*"
    );
  }

  componentDidUpdate() {
    this.iframeRef.current.contentWindow.postMessage(
      JSON.stringify(this.props.wallpaper),
      "*"
    );
  }

  renderWallpaperSize = () => {
    if (!this.imgRef.current) {
      return (
        <div className="">
          <span>Press run to generate a wallpaper</span>
        </div>
      );
    }

    const { height, width } = this.props.wallpaper;
    return (
      <div className="">
        <span>{`${height} x ${width}`}</span>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h4>CanvasPreview</h4>
        <div className="ui center aligned segment">
          <div style={{ height: "100%", display: "block" }}>
            <iframe
              title="canvasIframe"
              src="./canvasIframe.html"
              sandbox="allow-scripts"
              ref={this.iframeRef}
              style={{ display: "none" }}
            />
            <img
              ref={this.imgRef}
              onClick={this.onImageClick}
              style={{ width: "100%" }}
            />
          </div>
          {this.renderWallpaperSize()}
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
