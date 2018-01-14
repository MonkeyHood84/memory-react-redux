require('./../assets/styles.scss');
import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import boardReducer from './reducers/board.reducer';
import NumMemoryApp from './components/app.component';

const store = createStore(boardReducer);
ReactDOM.render(<NumMemoryApp store={store} />, document.getElementById('root'));

