## This project is no longer maintained and will eventually be achived. While it is extremely unlikely anyone will use this pet project in production, here is the warning: please DO NOT use it in production!

# Circlet

[![npm package](https://img.shields.io/npm/v/circlet.svg)](https://www.npmjs.org/package/circlet)

> A React-Redux game loop.

## Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
  * [NPM Package](#npm-package)
  * [Cloning This Repository](#cloning-this-repository)
* [Setting up Circlet](#setting-up-circlet)
  * [Connect Circlet to the Redux Store](#connect-circlet-to-the-redux-store)
  * [Initialise Circlet as a Component](#initialise-circlet-as-a-component)
* [Usage](#usage)
* [API](#api)
  * [`<Circlet>`](#circlet)
  * [`subscribeToCirclet()`](#subscribetocirclet)
* [Changelog](#changelog)

## Introduction

Circlet is an experimental React-Redux game loop implemented mostly according to the excellent article, [A Detailed Explanation of JavaScript Game Loops and Timing](http://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing), by Isaac Sukin.

## Installation

### NPM Package

Circlet is available as an [NPM package](https://www.npmjs.com/package/circlet):

```
yarn add -D circlet react-redux redux
```

### Cloning This Repository

Alternatively, you could also clone this repository to your project's source directory:

```
git clone https://github.com/honmanyau/circlet
```

## Setting up Circlet

### Automated Set-up

The NPM package includes a Node.js script ([auto-setup.js](https://github.com/honmanyau/circlet/blob/master/auto-setup.js)) for automatically setting up Circlet with project that is newly created with [create-react-app](https://github.com/facebook/create-react-app).

```sh
create-react-app awesome-game
cd awesome-game
yarn add -D circlet react-redux redux

# The script is meant to run from the project's root directory

cp node_modules/circlet/auto-setup.js .
node auto-setup.js
```

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
import App from './App';



ReactDOM.render(
  <Provider store={store}>
    <div>
      <Circlet />
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
```

## Usage

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

## API

### `<Circlet>`

The `Circlet` React component is mandatory and is set up as described above in the section [Setting up Circlet](#setting-up-circlet). Circlet's looping mechanism relies on the [`window.requestAnimationFrame()` web API](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), and there only one instance of `<Circlet>` is necessary in a given application in which everything is animated at the same target frame rate.

The `<Circlet>` component accepts the following options as props:
* **`targetFPS`**: the `targetFPS` props is an optional parameter sets the target FPS that Circlet will attempt to achieve; the default value of `targetFPS` is `60`. This option is primarily meant for FPS throttling, as Circlet's looping mechanism depends on `window.requestAnimationFrame()`, which is generally only called as fast as the display refresh rate in a browser.

```javascript
<Circlet targetFPS={30} />
```

### `subscribeToCirclet()`

The functionality of `subscribeToCirclet()` is covered above in the [Usage](#usage) section. It should be noted that, depending on delta time (the time between two Circlet loops, which is also the time between two `window.requestAnimationFrame()`) and timestep size for simulation (`1000 / targetFPS`), a subscribed function may be called 0 or more time each loop.

In addition, the `render` flag, which is applied as an argument to any subscribed function that Circlet calls, is only set to true if at least 1 frame was simulated in the last loop.
