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

  update = (render, epsilon) => {
    // Handle calculations here, such as physics
  }

  // ...
}

const mapDispatchToProps = (dispatch) => {
  return { subscribeToCirclet: (fn) => dispatch(subscribeToCirclet(fn)) }
}

export default connect(null, mapDispatchToProps)(Asteroid);
```
