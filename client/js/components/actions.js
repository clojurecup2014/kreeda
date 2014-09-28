/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react');
    Backbone = require('backbone'),
    ActionComponent = require('./action');

var Action = Backbone.Model.extend({
});

var ActionCollection = Backbone.Collection.extend({
  model: Action,
  initialize: function(models,options){
    this.url=options.url;
  },
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
    var attributes = {name: this.refs.inputActionName.getDOMNode().value, 
      points: parseInt(this.refs.inputPoints.getDOMNode().value)};
    this.props.apps.create(attributes,{wait: true});
    this.props.apps.createAction(attributes['actionName'], attributes['points']);
  },
  render: function(){
    return (
      <li>
        <form onSubmit={this.submit}>
          <input name="actionName" ref="inputActionName" type="text" placeholder="Enter Action Name"/>
          <input name="points" ref="inputPoints" type="number" placeholder="Enter Points"/>
        </form>
      </li>
    );
  }
});

var ActionsComponent = React.createClass({
  getInitialState: function () {
    return {actions: new ActionCollection([],{url: '/applications/'+this.props.applicationId+'/actions'})};
  },
  refresh: function(){
    this.state.actions.fetch({reset: true});
  },
  componentWillMount: function() {
    this.refresh();
    this.state.actions.on('reset',this.update,this);
    this.state.actions.on('add',this.update,this);
  },
  update: function(){
    this.setState({actions: this.state.actions});
  },
  render: function() {
    var actionComponents = this.state.actions.map(function(action) {
      <ActionComponent action={action}/>
    });
    return <ul>
      {actionComponents}
    </ul>;
  }
});

exports = module.exports = ActionsComponent;
