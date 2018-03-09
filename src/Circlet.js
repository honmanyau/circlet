import React from 'react';
import { connect } from 'react-redux';

import { initialiseCirclet } from './actions';



class Circlet extends React.Component {
  constructor(props) {
    super(props);

    this.requestID = null;
  }

  componentDidMount() {
    this.requestID = window.requestAnimationFrame(this.loop);
  }

  componentWillUnmount() {
    window.cancelAminationFrame(this.requestID);
  }

  loop = (timestamp) => {
    const { circlet } = this.props;
    const { initialised } = circlet;

    if (!initialised) {
      this.props.initialiseCirclet(timestamp);
    }
    else {
      const { referenceFPS, simulatedFrames } = circlet;
      const referenceMSPF = 1000 / referenceFPS;
      const sigmaTime = timestamp - initialised;
      const deltaTime = sigmaTime - referenceMSPF * simulatedFrames;
      const framesToSimulate = Math.floor(deltaTime / referenceMSPF);
      const remainingUnsimulated = deltaTime - framesToSimulate * referenceMSPF;
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    circlet: state.circlet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialiseCirclet: (timestamp) => dispatch(initialiseCirclet(timestamp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Circlet);
