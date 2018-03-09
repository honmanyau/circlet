import React from 'react';
import { connect } from 'react-redux';



class Circlet extends React.Component {
  render() {
    console.log(this.props.circlet);
    return null;
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

export default connect(mapStateToProps, null)(Circlet);
