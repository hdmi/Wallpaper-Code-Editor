import React from 'react';
import {connect} from 'react-redux';
import {editCanvas} from '../actions';

import CodeEditor from './CodeEditor';
import CanvasPreview from './CanvasPreview';
import Swatch from './Swatch';
import SaveList from './SaveList';


class App extends React.Component {

  constructor(props) {
    super(props);

    let wpLocalStorage = localStorage.getItem('wallpaper');
    if(wpLocalStorage) {
      wpLocalStorage = JSON.parse(wpLocalStorage);
      if(!wpLocalStorage.error){
          this.props.editCanvas({...wpLocalStorage});
      }
    }
  }

  render() {
    return (
        <div className="ui container grid">
          <div className="eight wide column" style={{backgroundColor:''}}>
            <div className="ui segment">
              <CodeEditor />
              <Swatch />
            </div>
            <div className="ui segment">
              <SaveList/>
            </div>
          </div>
          <div className="eight wide column" style={{backgroundColor:''}}>
            <div className="ui segment">
              <CanvasPreview />
            </div>
          </div>
        </div>
    );
  }
}

export default connect(null, {editCanvas})(App);
