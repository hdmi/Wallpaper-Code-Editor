import React from 'react';

class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { code: '' };
    this.codeRef = React.createRef();
  }

  clientRunJS(code){
    return Function('"use strict";return (' + code + ')')();
  }

  onClickRun = () => {
    this.setState({code: this.codeRef.current.value})
    //new Function(this.codeRef.current.value)()
    try {
        this.clientRunJS(this.codeRef.current.value);
    } catch{alert('Error evaluating the code')}

  }

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={e => e.preventDefault()}>
          <div className="field">
            <label>Wallpaper Code</label>
            <textarea ref={this.codeRef}/>
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
