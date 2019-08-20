import React from 'react';
import {connect} from 'react-redux';
import {editError, drawCanvas} from '../actions';

class CanvasPreview extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  onClickCanvas = (e) => {
    const a = document.createElement('a');
    let image = this.canvasRef.current.toDataURL("image/png")
    image = image.replace("image/png", "image/octet-stream");
    a.setAttribute('download', 'wallpaper.png');
    a.setAttribute('href', image);
    a.click();
  }

  //TODO: Draw canvas on state update
  componentDidMount() {
    console.log('Canvas MOUNTED')
    this.runCode();
  }

  componentDidUpdate() {
    console.log('Canvas UPDATED')
    this.clearCanvas();
    this.runCode();
  }

  runCode() {

    const {code, error} = this.props.wallpaper;

    if(error){
      return;
    }

    try {
        this.clientRunJS(code, this.canvasRef);
    } catch(err) {
      this.props.editError({...this.props.wallpaper, error: err.message});
    }

  }

  clientRunJS(code, canvasRef){
    return Function('"use strict";return function(c, palette){' + code + '}', )()(canvasRef.current, this.props.wallpaper.palette);
  }

  clearCanvas() {
    const canvas = this.canvasRef.current;
    //"Changing" the canvas size resets the canvas (clearRect maintains ctx preferences so is not desirable)
    canvas.width = canvas.width;
  }

  render() {
    const {height, width, ratio} = this.props.wallpaper;

    return (
      <div>
        <h4>CanvasPreview</h4>
        <div className="ui center aligned segment">
          <canvas
            ref={this.canvasRef}
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

export default connect(mapStateToProps, {editError, drawCanvas})(CanvasPreview);
