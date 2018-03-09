# Circlet

> A React-Redux game loop.

## Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
  * [NPM Package](#npm-package)
  * [Cloning This Repository](#cloning-this-repository)
* [Setting up Circlet](#setting-up-circlet)
  * [Connect Circlet to the Redux Store](#connect-circlet-to-the-redux-store)
  * [Initialise Circlet as a Component](#initialise-circlet-as-a-component)
* [Quickstart](#quickstart)
* [Changelog](#changelog)

## Introduction

Circlet is an experimental React-Redux game loop implemented mostly according to the excellent article, [A Detailed Explanation of JavaScript Game Loops and Timing](http://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing), by Isaac Sukin.

## Installation

### NPM Package

Circlet is available as an [NPM package](https://www.npmjs.com/package/circlet):

```
npm install --save circlet
```

### Cloning This Repository

Alternatively, you could also clone this repository to your project's source directory:

```
git clone https://github.com/honmanyau/circlet
```

## Setting up Circlet

### Connect Circlet to the Redux Store

```javascript
import { createStore, combineReducers } from 'redux';
import { circletReducer as circlet } from 'circlet';



const reducer = combineReducers({ circlet, otherReducers });
const store = createStore(reducer);

export default store;
```

### Initialise Circlet as a Component

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Circlet from 'circlet';

import store from './store';



ReactDOM.render(
  <Provider store={store}>
    <div>
      <Circlet />
    </div>
  </Provider>,
  document.getElementById('root')
);
```

## Quickstart

To include a function in the game loop that Circlet provides, use the `subscribeToCirclet` action creator:

```javascript
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';

class Asteroid extends React.Component {
  componentDidMount() {
    this.props.subscribeToCirclet(this.update);
  }

  update = () => {
    // Handle physics here
  }

  // ...
}

const mapDispatchToProps = (dispatch) => {
  return { subscribeToCirclet: (fn) => dispatch(subscribeToCirclet(fn)) }
}

export default connect(null, mapDispatchToProps)(Asteroid);
```

Circlet calls a subscribed function with two parameters, `render` and `epsilon`. As a single loop may contain multiple simulated frames, the `render` Boolean is used as a flag to indicate the end of simulation, and when it is appropriate to call `this.setState()` to trigger visual changes that depend on a component's state.

The second parameter, `epsilon`, the number of frames that has not been simulated in the last loop; it is always positive and is designed to be used for interpolation where applicable. The following example shows how `render` and `epsilon` could be used:

```javascript
import { connect } from 'react-redux';
import { subscribeToCirclet } from 'circlet';

class Asteroid extends React.Component {
  constructor(props) {
    super(props);

    this.vx = 0;
    this.vy = 2;
    this.dx = 0;
    this.dy = 0;
    this.x = 100;
    this.y = 0;
    this.state = { vx: 0, vy: 2, x: 100, y: 0 }
  }

  componentDidMount() {
    this.props.subscribeToCirclet(this.subscription);
  }

  subscription = (render, epsilon) => {
    this.update(epsilon);

    if (render) {
      this.draw();
    }
  }

  update = (epsilon) => {
    const { vx, vy } = this;

    this.x += vx;
    this.y += vy;
    // dx and dy are used for interpolated rendering only
    this.dx = vx * epsilon;
    this.dy = vy * epsilon;
  }

  draw = () => {
    const { dx, dy, x, y } = this;

    this.setState({
      x: x + dx,
      y: y + dy
    });
  }

  // ...
}

const mapDispatchToProps = (dispatch) => {
  return { subscribeToCirclet: (fn) => dispatch(subscribeToCirclet(fn)) }
}

export default connect(null, mapDispatchToProps)(Asteroid);
```

## Changelog

**1.0.0**
* Published Circlet!

**1.0.1**
* Rebuilt library with Babel and republished to NPM.
* Updated documentation.

**1.0.2**
* Corrected how `epsilon`, which is passed to every function subscribed to Circlet, is calculated.
* Updated documentation.

**1.0.3**
* Updated documentation.
