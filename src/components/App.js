import React from 'react';
import CodeEditor from './CodeEditor';
import CanvasPreview from './CanvasPreview';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef();
  }

  render() {
    return (
        <div className="ui container grid">
          <div className="eight wide column" style={{backgroundColor:'red'}}>
            <div className="ui segment">
              <CodeEditor canvasRef={this.canvasRef}/>
            </div>
          </div>
          <div className="eight wide column" style={{backgroundColor:'blue'}}>
            <div className="ui segment">
              <CanvasPreview canvasRef={this.canvasRef}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
