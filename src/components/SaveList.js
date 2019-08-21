import React from 'react';

class SaveList extends React.Component {

    render() {
      return (
        <div className="ui tiny images">
          <img className="ui image" src={require('../res/imgPlaceholder.png')} alt="1"></img>
          <img className="ui image" src={require('../res/imgPlaceholder.png')} alt="2"></img>
          <img className="ui image" src={require('../res/imgPlaceholder.png')} alt="3"></img>
        </div>
      );
    }
}

export default SaveList;
