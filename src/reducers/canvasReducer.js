import {CLEAR_CANVAS, DRAW_CANVAS, EDIT_CANVAS, SAVE_CANVAS, DOWNLOAD_CANVAS, EDIT_ERROR} from '../actions/types';
import {Wallpaper} from '../wallpaper';

const INITIAL_STATE = {
  wallpaper: Wallpaper
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
    case EDIT_ERROR:
      console.log('before: ', state);
      console.log('after: ', {...state, wallpaper: action.payload});
      return {...state, wallpaper: action.payload};
    default:
      return state;
  }
};
