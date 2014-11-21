var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

// retrieve the current TODO data from the TodoStore
var getTodoState = function() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  }
}

var TodoApp = React.createClass({
  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos = {this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos = {this.state.allTodos} />
      </div>
    );
  },

  // event handler for 'change' events coming from TodoStore
  // underscore must be a way to demarcate it as an event handler
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;