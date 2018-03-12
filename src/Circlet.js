import React from 'react';
import { connect } from 'react-redux';

import {
  initialiseCirclet,
  setTargetFPS,
  setRenderFlag,
  updateSimulatedFrames
} from './actions';



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
      this.props.setTargetFPS(Number(this.props.targetFPS) || 60);
    }
    else {
      const { setRenderFlag, updateSimulatedFrames } = this.props;
      const { targetFPS, simulatedFrames } = circlet;
      const referenceMSPF = 1000 / targetFPS;
      const sigmaTime = timestamp - initialised;
      const deltaTime = sigmaTime - referenceMSPF * simulatedFrames;
      const framesToSimulate = Math.floor(deltaTime / referenceMSPF);
      const finalFrame = framesToSimulate - 1;
      const epsilon = deltaTime / referenceMSPF - framesToSimulate;

      for (let frame = 0; frame < framesToSimulate; frame++) {
        const render = (frame === finalFrame) ? true : false;

        setRenderFlag(render);
        updateSimulatedFrames(simulatedFrames + framesToSimulate);
        /*
         * The render flag is passed down so that rendering can optionally only
         * occur onces all the frames in the current loop have been simulated;
         * epsilon can be used for extrapolation.
         */
        this.update(render, epsilon);
      }
    }

    this.requestID = window.requestAnimationFrame(this.loop);
  }

  update = (render, epsilon) => {
    const { subscriptions } = this.props.circlet;

    subscriptions.forEach((fn) => {
      fn(render, epsilon);
    });
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    circlet: state.circlet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialiseCirclet: (timestamp) => dispatch(initialiseCirclet(timestamp)),
    setRenderFlag: (flag) => dispatch(setRenderFlag(flag)),
    updateSimulatedFrames: (frames) => dispatch(updateSimulatedFrames(frames)),
    setTargetFPS: (targetFPS) => dispatch(setTargetFPS(targetFPS))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Circlet);
