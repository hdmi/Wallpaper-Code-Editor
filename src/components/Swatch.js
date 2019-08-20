import React from 'react';
import {connect} from 'react-redux';
import {editCanvas} from '../actions';

const Swatch = (props) => {

  const submit = (e) => {
    e.preventDefault();
    props.editCanvas
  }

  const {height, width} = props.wallpaper;
  //TODO
  return (
    <form className="ui form" onSubmit={submit}>
      <div className="fields">
        <div className="two fields">
          <div className="four wide field">
            <label>Height</label>
            <input value={height}/>
          </div>
          <div className="four wide field">
            <label>Width</label>
            <input value={width}/>
          </div>
        </div>
      </div>
    </form>
  );

}

const mapStateToProps = (state) => {
  return {wallpaper: state.canvasReducer.wallpaper};
}

export default connect(mapStateToProps, {editCanvas})(Swatch);
