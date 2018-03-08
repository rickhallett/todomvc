import React, { Component } from 'react';
// import { Router, hashHistory, Switch, Route } from 'react-router';
// import App from './App';
import Utils, { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './utils';
import classNames from 'classnames';

// const Routes = () => (
// 	<Router history={hashHistory}>
// 		<Switch>
// 			<Route
// 				exact
// 				path="/"
// 				render={(props) => <App nowShowing={ALL_TODOS} />}
// 			/>
// 			<Route
// 				exact
// 				path="/active"
// 				render={(props) => <App nowShowing={ACTIVE_TODOS} />}
// 			/>
// 			<Route
// 				exact
// 				path="/completed"
// 				render={(props) => <App nowShowing={COMPLETED_TODOS} />}
// 			/>
// 		</Switch>
// 	</Router>
// );

class TodoFooter extends Component {
	render() {
		const activeTodoWord = Utils.pluralize(this.props.count, 'item');
		let clearButton = null;

		if (this.props.completedCount > 0) {
			clearButton = (
				<button
					className="clear-completed"
					onClick={this.props.onClearCompleted}>
					Clear completed
				</button>
			);
		}

		const nowShowing = this.props.nowShowing;
		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.count}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					<li>
						<a
							href="#/"
							className={classNames({ selected: nowShowing === ALL_TODOS })}>
							All
						</a>
						
					</li>{' '}
					<li>
						<a
							href="#/active"
							className={classNames({ selected: nowShowing === ACTIVE_TODOS })}>
							Active
						</a>
					</li>{' '}
					<li>
						<a
							href="#/completed"
							className={classNames({
								selected: nowShowing === COMPLETED_TODOS
							})}>
							Completed
						</a>
					</li>
				</ul>
				{clearButton}
			</footer>
		);
	}
}

export default TodoFooter;
