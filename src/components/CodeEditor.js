import React from 'react';

class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { code: 'var ctx = c.getContext(\'2d\');\nctx.fillStyle = \'red\';\nctx.fillRect(0,0,c.width, c.height);' };
    this.codeRef = React.createRef();
  }

  clientRunJS(code, canvasRef){
    return Function('"use strict";return function(c){' + code + '}', )()(canvasRef.current);
  }

  onClickRun = () => {
    this.setState({code: this.codeRef.current.value})
    try {
        this.clearCanvas();
        this.clientRunJS(this.codeRef.current.value, this.props.canvasRef);
    } catch(err){alert(err)}
    console.log('code', this.codeRef.current.value);
  }

  clearCanvas() {
    const canvas = this.props.canvasRef.current;
    //"Changing" the canvas size resets the canvas (clearRect maintains ctx preferences so is not desirable)
    canvas.width = canvas.width;
  }

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={e => e.preventDefault()}>
          <div className="field">
            <label>Wallpaper Code</label>
            <textarea ref={this.codeRef} value={this.state.code}/>
          </div>
          <div className="field">
            <button className="ui button white" onClick={() => this.onClickRun()}>Run!</button>
          </div>

        </form>
      </div>
    );
  }

}

export default CodeEditor;
