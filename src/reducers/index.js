import {
  INITIALISE_CIRCLET,
  SET_RENDER_FLAG,
  UPDAET_SIMULATED_FRAMES,
  SUBSCRIBE_TO_CIRCLET
} from '../actions';

const initialState = {
  referenceFPS: 60,
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

    case SET_RENDER_FLAG:
      return Object.assign({}, state, { render: payload.flag });

    case UPDAET_SIMULATED_FRAMES:
      return Object.assign({}, state, { simulatedFrames: payload.frames });

    case SUBSCRIBE_TO_CIRCLET:
      const subscriptions = state.subscriptions.slice();

      subscriptions.push(payload.fn);

      return Object.assign({}, state, { subscriptions });

    default:
      return state;
  }
}
