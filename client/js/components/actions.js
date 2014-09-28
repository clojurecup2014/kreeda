/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react');

var ActionsComponent = React.createClass({
  getInitialState: function () {
    return {actions: []}
  },
  componentWillMount: function() {
    var self = this;
    $.getJSON('/apps/'+this.state.applicationId+'/actions', function(result) {
      self.setState({actions: result});
    });
  },
  render: function() {
    var actionComponents = this.state.actions.map(function(action) {
      <Action action={action}/>
    });
    return <ul>
      {actionComponents} 
    </ul>;
  }
});

exports = module.exports = ActionsComponent;
