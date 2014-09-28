/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react');
    Backbone = require('backbone'),
    ActionComponent = require('./action');

var ActionModel = Backbone.Model.extend({
});

var ActionsCollection = Backbone.Collection.extend({
  model: ActionModel,
  url: "",
  createAction: function(actionName, points){
    this.create({
        name: actionName,
        points: points
      },
      {
        wait: true
    });
  }
});

var NewActionComponent = React.createClass({
  submit: function(e){
    var attributes = $(this).serialize();
    this.props.apps.createAction(attributes['actionName'], attributes['points']);
  },
  render: function(){
    return (
      <li>
        <form onSubmit={this.submit}>
          <input name="actionName" type="text" placeholder="Enter Action Name"/>
          <input name="points" type="text" placeholder="Enter Points"/>
        </form>
      </li>
    );
  }
});

var ActionsComponent = React.createClass({
  getInitialState: function () {
    return {actions: new ActionCollection({url: '/applications/'+this.state.applicationId+'/actions'})};
  },
  componentWillMount: function() {
    var self = this;
    $.getJSON('/applications/'+this.state.applicationId+'/actions', function(result) {
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
