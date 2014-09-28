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
  }
});

var NewActionComponent = React.createClass({
  submit: function(e){
    e.preventDefault();
    var attributes = {
      name: this.refs.inputActionName.getDOMNode().value, 
      points: parseInt(this.refs.inputPoints.getDOMNode().value)
    };
    kreeda.publishAction('create_action', attributes);
    return this.props.actions.create(attributes,{wait: true});
  },
  render: function(){
    return <div className='col-md-4'>
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h2 className='panel-title'>Create a new Action</h2>
        </div>
        <div className='panel-body'>
          <div className='col-md-12'>
            <form className='form-horizontal' role='form' onSubmit={this.submit}>
              <div className='form-group'>
                <label>Name: </label>
                <input className='form-control' name="actionName" ref="inputActionName" type="text" placeholder="Enter Action Name"/>
              </div>
              <div className='form-group'>
                <label>Points </label>
                <input className='form-control' name="points" ref="inputPoints" type="number" placeholder="Enter Points"/>
              </div>
              <button type='submit' className='btn btn-primary'>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>;
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
    this.state.actions.on('change', this.update, this);
    this.state.actions.on('destroy', this.update, this);
  },
  update: function(){
    this.setState({actions: this.state.actions});
  },
  render: function() {
    var actionComponents = this.state.actions.map(function(action) {
      return <ActionComponent key={action.id} action={action}/>
    });
    return <div>
      {actionComponents}
      <NewActionComponent actions={this.state.actions}/>
    </div>;
  }
});

exports = module.exports = ActionsComponent;
