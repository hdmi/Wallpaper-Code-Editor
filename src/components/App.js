import React from 'react';
import CodeEditor from './CodeEditor';
import CanvasPreview from './CanvasPreview';
import Swatch from './Swatch';
import SaveList from './SaveList';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef();
  }

  render() {
    return (
        <div className="ui container grid">
          <div className="eight wide column" style={{backgroundColor:''}}>
            <div className="ui segment">
              <CodeEditor canvasRef={this.canvasRef}/>
              <Swatch />
            </div>
            <div className="ui segment">
              <SaveList/>
            </div>
          </div>
          <div className="eight wide column" style={{backgroundColor:''}}>
            <div className="ui segment">
              <CanvasPreview canvasRef={this.canvasRef}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
