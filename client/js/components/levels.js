/** @jsx React.DOM */

var React = require('react');

var LevelsComponent = React.createClass({
  render: function(){
    return <h1>Showing levels for {this.props.applicationId}</h1>;
  }
});

exports = module.exports = LevelsComponent;
