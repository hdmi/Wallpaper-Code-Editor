import {CLEAR_CANVAS, DRAW_CANVAS, EDIT_CANVAS, SAVE_CANVAS, DOWNLOAD_CANVAS} from './types';

export const clearCanvas = () => {
  return {
    type: CLEAR_CANVAS
  }
};

export const drawCanvas = (wallpaper) => {
  return {
    type: DRAW_CANVAS,
    payload: wallpaper
  }
};

export const editCanvas = (wallpaper) => {
  return {
    type: EDIT_CANVAS,
    payload: wallpaper
  }
};

export const saveCanvas = (wallpaper) => {
  return {
    type: SAVE_CANVAS,
    payload: wallpaper
  }
};

export const downloadCanvas = (wallpaper) => {
  return {
    type: DOWNLOAD_CANVAS,
    payload: wallpaper
  }
};
