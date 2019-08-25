import React from 'react';
import {Wallpaper} from '../wallpaper';
import {connect} from 'react-redux';
import {drawCanvas, editCanvas} from '../actions';

class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.codeRef = React.createRef();
  }

  componentDidMount() {
    this.codeRef.current.value = this.props.wallpaper.code;
  }

  onTextareaKeyDown = (e) => {
    if(e.keyCode===9 || e.which===9){
      const textarea = this.codeRef.current;
      e.preventDefault();
      var s = textarea.selectionStart;
      textarea.value = textarea.value.substring(0,textarea.selectionStart) + "\t" + textarea.value.substring(textarea.selectionEnd);
      textarea.selectionEnd = s+1;
    }
  }

  onClickRun = () => {
    this.props.drawCanvas({
      code: this.codeRef.current.value,
      error: ''
    });
  }

  onClickSave = () => {
    /*const newWallpaper = {
      ...Wallpaper,
      code: this.state.code,
      thumbnail: ''};*/
    }

    renderError() {
      const {error} = this.props.wallpaper;
      if(error){
        return (
          <div className="ui error message">
            <div className="header">{error}</div>
          </div>
        );
      }
    }

    render() {
      return (
        <div>
          <form className="ui form error" onSubmit={e => e.preventDefault()}>
            <div className="field">
              <h4>Wallpaper Code</h4>
              <textarea ref={this.codeRef} onKeyDown={this.onTextareaKeyDown}/>
            </div>
            {this.renderError()}
            <div className="fields">
              <div className="field">
                <button className="ui button green" onClick={() => this.onClickRun()}>Run!</button>
              </div>
              <div className="field">
                <button className="ui button white" onClick={() => this.onClickSave()}>Save</button>
              </div>
              <div className="field">
                <button className="ui button red" onClick={() => this.clearCanvas()}>Clear</button>
              </div>
            </div>
          </form>
        </div>
      );
    }

  }

  const mapStateToProps = (state) => {
    return {wallpaper: state.canvasReducer.wallpaper};
  }

  export default connect(mapStateToProps, {drawCanvas, editCanvas})(CodeEditor);
