import React from 'react';
import {connect} from 'react-redux';
import {editCanvas} from '../actions';

class Swatch extends React.Component {

  constructor(props) {
    super(props);
    this.heightRef = React.createRef();
    this.widthRef = React.createRef();
  }

  componentDidMount() {
    this.heightRef.current.value = this.props.wallpaper.height;
    this.widthRef.current.value = this.props.wallpaper.width;
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  onPressEnter = e => {
    if(e.keyCode !==13 || e.which !== 13){
      return;
    }

    this.props.editCanvas({
      height: this.heightRef.current.value,
      width: this.widthRef.current.value
    });
  }

  render() {

    return (
      <div>
        <form className="ui form" onSubmit={this.onSubmit}>
            <h4 class="ui dividing header">Wallpaper properties</h4>
            <div className="two fields">
              <div className="three wide field">
                <label>Height</label>
                <input ref={this.heightRef} onKeyDown={this.onPressEnter}/>
              </div>
              <div className="three wide field">
                <label>Width</label>
                <input ref={this.widthRef} onKeyDown={this.onPressEnter}/>
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

export default connect(mapStateToProps, {editCanvas})(Swatch);
