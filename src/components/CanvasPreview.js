import React from 'react';
import {connect} from 'react-redux';
import {editError} from '../actions';

class CanvasPreview extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.iframeRef = React.createRef();
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
    this.iframeRef.current.contentWindow.postMessage(JSON.stringify(this.props.wallpaper), '*')
  }

  componentDidUpdate() {
    console.log('Canvas UPDATED')
    this.iframeRef.current.contentWindow.postMessage(JSON.stringify(this.props.wallpaper), '*')
  }



  clientRunJS(code, canvasRef){
    return Function('"use strict";return function(c, palette){' + code + '}', )()(canvasRef.current, this.props.wallpaper.palette);
  }

/*
<iframe src="javascript:void(0);" ref={this.iframeRef}>
  <canvas
    ref={this.canvasRef}
    height={height*ratio}
    width={width*ratio}
    style={{width: '90%'}}
    onClick={this.onClickCanvas} />
</iframe>

*/
  render() {
    const {height, width, ratio} = this.props.wallpaper;

    return (
      <div>
        <h4>CanvasPreview</h4>
        <div className="ui center aligned segment">
          <div style={{width:"90%", height:"100%", display:"block"}}>
          <iframe src="./canvasIframe.html"
            width="90%"
            display="inline"
            style={{overflow:"auto"}}
            frameBorder="0"
            ref={this.iframeRef}/>
        </div>
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

export default connect(mapStateToProps, {editError})(CanvasPreview);
