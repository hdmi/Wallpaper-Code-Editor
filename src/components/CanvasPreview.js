import React from 'react';
import canvas from 'canvas';

class CanvasPreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {height: 1920, width: 1080, ratio: 1, imgBlob: null };
  }

  onClickCanvas = (e) => {
    const a = document.createElement('a');
    const image = this.props.canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
    a.setAttribute('download', 'wallpaper.png');
    a.setAttribute('href', image);
    a.click();
  }

  render() {
    const {height, width, ratio} = this.state;

    return (
      <div>
        <h4>CanvasPreview</h4>
        <div className="ui center aligned segment">
          <canvas
            height={height*ratio}
            width={width*ratio}
            style={{width: '90%'}}
            ref={this.props.canvasRef}
            onClick={this.onClickCanvas} />
          <div className="">
            <span>{`${height} x ${width}`}</span>
          </div>
        </div>
      </div>
    );
  }

}

export default CanvasPreview;
