export const INITIALISE_CIRCLET = 'INITIALISE_CIRCLET';
export const SET_RENDER_FLAG = 'SET_RENDER_FLAG';
export const UPDAET_SIMULATED_FRAMES = 'UPDAET_SIMULATED_FRAMES';
export const SUBSCRIBE_TO_CIRCLET = 'SUBSCRIBE_TO_CIRCLET';

export function initialiseCirclet(timestamp) {
  return {
    type: INITIALISE_CIRCLET,
    payload: { timestamp }
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
    type: UPDAET_SIMULATED_FRAMES,
    payload: { frames }
  }
}

export function subscribeToCirclet(fn) {
  return {
    type: SUBSCRIBE_TO_CIRCLET,
    payload: { fn }
  }
}
