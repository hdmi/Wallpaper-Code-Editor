import {CLEAR_CANVAS, DRAW_CANVAS, EDIT_CANVAS, SAVE_CANVAS, DOWNLOAD_CANVAS} from '../actions/types';

const INITIAL_STATE = {
  canvasReference: null,
  wallpaper: null
}

export default (state = INITIAL_STATE, action) => {

  switch(action.type){
    case CLEAR_CANVAS:
    case SAVE_CANVAS:
    case DOWNLOAD_CANVAS:
    // TODO
      return {...state};
    case DRAW_CANVAS:
    case EDIT_CANVAS:
      return {...state, wallpaper: action.payload};
    default:
      return state;
  }
};
