const initialState = {
  referenceFPS: 60,
  initialised: 0,
  simulatedFrames: 0,
  subscriptions: [],
  render: false
}

function circlet(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    default:
      return state;
  }
}

export default circlet;
