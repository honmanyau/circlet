export const INITIALISE_CIRCLET = 'INITIALISE_CIRCLET';
export const SET_RENDER_FLAG = 'SET_RENDER_FLAG';
export const UPDATE_SIMULATED_FRAMES = 'UPDATE_SIMULATED_FRAMES';
export const SUBSCRIBE_TO_CIRCLET = 'SUBSCRIBE_TO_CIRCLET';
export const SET_TARGET_FPS = 'SET_TARGET_FPS';

export function initialiseCirclet(timestamp) {
  return {
    type: INITIALISE_CIRCLET,
    payload: { timestamp }
  }
}

export function setTargetFPS(targetFPS) {
  return {
    type: SET_TARGET_FPS,
    payload: { targetFPS }
  }
}

export function setRenderFlag(flag) {
  return {
    type: SET_RENDER_FLAG,
    payload: { flag }
  }
}

export function updateSimulatedFrames(frames) {
  return {
    type: UPDATE_SIMULATED_FRAMES,
    payload: { frames }
  }
}

export function subscribeToCirclet(fn) {
  return {
    type: SUBSCRIBE_TO_CIRCLET,
    payload: { fn }
  }
}
