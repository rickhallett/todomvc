import React, { Component } from 'react';
import { Router } from 'director';

import TodoFooter from './Footer';
import TodoItem from './TodoItem';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './utils';

const ENTER_KEY = 13;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { nowShowing: ALL_TODOS, editing: null, newTodo: '' };
	}

	componentDidMount() {
		const setState = this.setState;
		const router = Router({
			'/': setState.bind(this, { nowShowing: ALL_TODOS }),
			'/active': setState.bind(this, { nowShowing: ACTIVE_TODOS }),
			'/completed': setState.bind(this, { nowShowing: COMPLETED_TODOS })
		});
		router.init('/');
	}

	handleChange(event) {
		this.setState({ newTodo: event.target.value });
	}

	handleNewTodoKeyDown(event) {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		const val = this.state.newTodo.trim();

		if (val) {
			this.props.model.addTodo(val);
			this.setState({ newTodo: '' });
		}
	}

	toggleAll(event) {
		const checked = event.target.checked;
		this.props.model.toggleAll(checked);
	}

	toggle(todoToToggle) {
		this.props.model.toggle(todoToToggle);
	}

	destroy(todo) {
		this.props.model.destroy(todo);
	}

	edit(todo) {
		this.setState({ editing: todo.id });
	}

	save(todoToSave, text) {
		this.props.model.save(todoToSave, text);
		this.setState({ editing: null });
	}

	cancel() {
		this.setState({ editing: null });
	}

	clearCompleted() {
		this.props.model.clearCompleted();
	}

	render() {
		let footer;
		let main;
		let todos = this.props.model.todos;

		let shownTodos = todos.filter((todo) => {
			switch (this.state.nowShowing) {
				case ACTIVE_TODOS:
					return !todo.completed;
				case COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		}, this);

		const todoItems = shownTodos.map((todo) => {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={() => this.toggle(todo)}
					onDestroy={() => this.destroy(todo)}
					onEdit={() => this.edit(todo)}
					editing={this.state.editing === todo.id}
					onSave={(text) => this.save(todo, text)}
					onCancel={() => this.cancel()}
				/>
			);
		}, this);

		const activeTodoCount = todos.reduce((accum, todo) => {
			return todo.completed ? accum : accum + 1;
		}, 0);

		const completedCount = todos.length - activeTodoCount;

		const shouldShowFooter = activeTodoCount > 0 || completedCount > 0;
		if (shouldShowFooter) {
			footer = (
				<TodoFooter
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={() => this.clearCompleted()}
				/>
			);
		}

		const shouldShowToggleAllCheckbox = todos.length > 0;
		if (shouldShowToggleAllCheckbox) {
			main = (
				<section className="main">
					<input
						className="toggle-all"
						type="checkbox"
						onChange={(event) => this.toggleAll(event)}
						checked={activeTodoCount === 0}
					/>
					<ul className="todo-list">{todoItems}</ul>
				</section>
			);
		}

		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						value={this.state.newTodo}
						onKeyDown={(event) => this.handleNewTodoKeyDown(event)}
						onChange={(event) => this.handleChange(event)}
						autoFocus={true}
					/>
				</header>
				{main}
				{footer}
			</div>
		);
	}
}

export default App;
