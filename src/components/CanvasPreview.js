import React from 'react';
import {connect} from 'react-redux';

class CanvasPreview extends React.Component {

  onClickCanvas = (e) => {
    const a = document.createElement('a');
    const image = this.props.canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
    a.setAttribute('download', 'wallpaper.png');
    a.setAttribute('href', image);
    a.click();
  }

  //TODO: Draw canvas on state update
  componentDidMount() {}
  componentDidUpdate() {}

  clientRunJS(code, canvasRef){
    return Function('"use strict";return function(c){' + code + '}', )()(canvasRef.current);
  }

  render() {
    const {height, width, ratio} = this.props.wallpaper;

    return (
      <div>
        <h4>CanvasPreview</h4>
        <div className="ui center aligned segment">
          <canvas
            height={height*ratio}
            width={width*ratio}
            style={{width: '90%'}}
            onClick={this.onClickCanvas} />
          <div className="">
            <span>{`${height} x ${width}`}</span>
          </div>
        </div>
      </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {wallpaper: state.canvasReducer.wallpaper};
}

export default connect(mapStateToProps)(CanvasPreview);
