import React from 'react';

class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: 'var ctx = c.getContext("2d");\nconst palette = ["E63946", "F1FAEE", "A8DADC", "457B9D", "1D3557"];\n\nfor(var i = 0; i < palette.length; i++) {\n\tctx.fillStyle = palette[i];\n\tctx.fillRect(0, 100 * i, c.width, c.height);\n};',
      error: ''
    };
    this.codeRef = React.createRef();
  }

  componentDidMount() {
    this.codeRef.current.value = this.state.code;

    const codeLocalStorage = localStorage.getItem('code');
    if(codeLocalStorage) {
      this.setState({code: codeLocalStorage});
      this.codeRef.current.value = codeLocalStorage;
    }

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

  clientRunJS(code, canvasRef){
    return Function('"use strict";return function(c){' + code + '}', )()(canvasRef.current);
  }

  onClickRun = () => {
    this.setState({code: this.codeRef.current.value})
    try {
        this.clearCanvas();
        this.clientRunJS(this.codeRef.current.value, this.props.canvasRef);
        this.setState({error: ''});
        localStorage.setItem('code', this.codeRef.current.value);
    } catch(err){
      this.setState({error: err.message})
    }
  }

  clearCanvas() {
    const canvas = this.props.canvasRef.current;
    //"Changing" the canvas size resets the canvas (clearRect maintains ctx preferences so is not desirable)
    canvas.width = canvas.width;
  }

  renderError() {
    if(this.state.error){
      return (
          <div className="ui error message">
            <div className="header">{this.state.error}</div>
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
          <div className="field">
            <button className="ui button green" onClick={() => this.onClickRun()}>Run!</button>
            <button className="ui button white" onClick={() => this.clearCanvas()}>Clear</button>
          </div>
        </form>
      </div>
    );
  }

}

export default CodeEditor;
