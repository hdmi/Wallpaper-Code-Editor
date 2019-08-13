import React from 'react';
import canvas from 'canvas';

class CanvasPreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {height: 1920, width: 1080, ratio: 1/3, imgBlob: null };
  }

  render() {
    const {height, width, ratio} = this.state;

    return (
      <div>
        <h4>CanvasPreview</h4>
        <div className="ui center aligned segment">
          <canvas height={height*ratio} width={width*ratio} ref={this.props.canvasRef}/>
        </div>
      </div>
    );
  }

}

export default CanvasPreview;
