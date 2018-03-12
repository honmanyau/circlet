const fs = require('fs');
const { exec } = require('child_process');

function terminateDueToError(errorMessage) {
  console.log(errorMessage);
  process.exit();
}

function createStoreJs() {
  const storeText = `import { createStore, combineReducers } from 'redux';
import { circletReducer as circlet } from 'circlet';

const reducer = combineReducers({ circlet });
const store = createStore(reducer);

export default store;`;

  const promise = new Promise((resolve, reject) => {
    const path = __dirname + '/src/store.js';

    fs.writeFile(path, storeText, (err) => {
      if (err) {
        terminateDueToError(`An error occured while creating ${path}.`);
      }

      resolve(`Finished creating ${path}!`);
    });
  });

  return promise;
}

function editIndexJs() {
  const promise = new Promise((resolve, reject) => {
    const path = __dirname + '/src/index.js';

    fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        terminateDueToError(`An error occured while reading ${path}.`);
      }

      // Replace code inside ReactDOM.render();
      const ref = `ReactDOM.render(<App />, document.getElementById('root'));`;
      data = data.replace(ref, `ReactDOM.render(
  <Provider store={store}>
    <div>
      <Circlet />
    </div>
  </Provider>,
  document.getElementById('root')
);`);

      // Insert the relevant imports
      const lines = data.split(/\r?\n/);
      const newData = [
        ...lines.slice(0, 2),
        ...[
          `import { Provider } from 'react-redux';`,
          `import Circlet from 'circlet';`,
          `import store from './store';`
        ],
        ...lines.slice(2)
      ].join('\n');

      fs.writeFile(path, newData, (err) => {
        if (err) {
          terminateDueToError(`An error occured while creating ${path}.`);
        }

        resolve(`Finished updating ${path}!`);
      });
    });
  });

  return promise;
}

// Main
const { stdin, stdout } = process;
const warning = `***CAUTION***
This script is intended to be used with a project freshly created with create-react-app. It will overwrite ./src/store.js and App.js. Do you want to continue? (y/N)`;

stdout.write(warning);
stdin.once('data', (data) => {
  const response = data.toString().trim().toLowerCase();

  if (response === 'y' || response === 'yes') {
    Promise.all([createStoreJs(), editIndexJs()]).then((response) => {
      console.log(`
${response.join('\n')}

=========
All done!
=========

If you haven't already installed react-redux and redux, this is a good time to do so!

=========`);
      process.exit();
    });
  }
});
