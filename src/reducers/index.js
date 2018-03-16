import {
  INITIALISE_CIRCLET,
  SET_TARGET_FPS,
  SET_RENDER_FLAG,
  UPDATE_SIMULATED_FRAMES,
  SUBSCRIBE_TO_CIRCLET
} from '../actions';

const initialState = {
  targetFPS: 60,
  initialised: 0,
  simulatedFrames: 0,
  subscriptions: [],
  render: false
}

export default function circlet(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case INITIALISE_CIRCLET:
      return Object.assign({}, state, { initialised: payload.timestamp });

    case SET_TARGET_FPS:
      return Object.assign({}, state, { targetFPS: payload.targetFPS });

    case SET_RENDER_FLAG:
      return Object.assign({}, state, { render: payload.flag });

    case UPDATE_SIMULATED_FRAMES:
      return Object.assign({}, state, { simulatedFrames: payload.frames });

    case SUBSCRIBE_TO_CIRCLET:
      const subscriptions = state.subscriptions.slice();

      subscriptions.push(payload.fn);

      return Object.assign({}, state, { subscriptions });

    default:
      return state;
  }
}
