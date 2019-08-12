import React from 'react';
import CodeEditor from './CodeEditor';
import CanvasPreview from './CanvasPreview';


function App() {
  return (
    <div className="ui container grid">
      <div className="eight wide column" style={{backgroundColor:'red'}}>
        <div className="ui segment">
          <CodeEditor />
        </div>
      </div>
      <div className="eight wide column" style={{backgroundColor:'blue'}}>
        <div className="ui segment">
          <CanvasPreview />
        </div>
      </div>
    </div>
  );
}

export default App;
