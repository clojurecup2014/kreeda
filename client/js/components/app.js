/** @jsx React.DOM */

var React = require('react');

var AppComponent = React.createClass({
  render: function() {
    return (
      <li key={this.props.app.id}>
      <div><span>App Name: </span><span>{this.props.app.name}</span></div>
      <div><span>App Key: </span><span>{this.props.app.key}</span></div>
      <div><span>App Secret: </span><span>{this.props.app.secret}</span></div>
      </li>
    );
  };
})

exports = module.exports = AppComponent;
