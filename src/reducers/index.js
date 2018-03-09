import { INITIALISE_CIRCLET } from '../actions';

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

    default:
      return state;
  }
}
