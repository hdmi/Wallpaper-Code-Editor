import {CLEAR_CANVAS, DRAW_CANVAS, EDIT_CANVAS, SAVE_CANVAS, DOWNLOAD_CANVAS, EDIT_ERROR} from '../actions/types';
import {Wallpaper} from '../wallpaper';

const INITIAL_STATE = {
  wallpaper: Wallpaper,
  other: null
}

export default (state = INITIAL_STATE, action) => {
  console.log("action: ",action)
  switch(action.type){
    case CLEAR_CANVAS:
    case SAVE_CANVAS:
    case DOWNLOAD_CANVAS:
    // TODO
      return {...state};
    case DRAW_CANVAS:
    case EDIT_CANVAS:
    case EDIT_ERROR:
      const newState = {...state, wallpaper: {...state.wallpaper, ...action.payload}};

      if(!newState.wallpaper.error){
        localStorage.setItem('wallpaper', JSON.stringify(newState.wallpaper));
      }

      return newState;
    default:
      return state;
  }
};
