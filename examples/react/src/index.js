import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, hashHistory } from 'react-router';
import App from './App';
import TodoModel from './TodoModel';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const model = new TodoModel('react-todos');

function render() {
	ReactDOM.render(
		<App model={model} />,
		document.getElementsByClassName('todoapp')[0]
	);
}

model.subscribe(render);
render();
