import React from 'react';
import { connect } from 'react-redux';



class Circlet extends React.Component {
  render() {
    retur null;
  }
}

const mapStateToProps = (state) => {
  return {
    circlet: state.circlet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(null, null)(Circlet);
