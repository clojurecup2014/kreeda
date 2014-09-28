/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react'),
    Backbone = require('backbone'),
    AppComponent = require('./app');

var AppModel = Backbone.Model.extend({
});

var AppsCollection = Backbone.Collection.extend({
  model: AppModel,
  url: "/applications"
});

var NewAppComponent = React.createClass({
  handleKeyDown: function(e){
    if(e.keyCode !== 13) return;
    var appName = e.target.value;
    this.props.apps.create({name: appName}, {wait: true});
    kreeda.publishAction('create_app', {});
    e.target.value='';
  },
  render: function(){
    return <div className='col-md-4'>
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h2 className='panel-title'>Create a new App</h2>
        </div>
        <div className='panel-body'>
          <input className='form-control' type="text" placeholder="Enter App Name" onKeyDown={this.handleKeyDown}/>
        </div>
      </div>
    </div>
  }
});

var AppsComponent = React.createClass({
  getInitialState: function () {
    return {apps: new AppsCollection()};
  },
  componentWillMount: function() {
    var self = this;
    this.refresh();
    this.state.apps.on('reset',this.update,this);
    this.state.apps.on('add',this.update,this);
    this.state.apps.on('destroy', this.update, this);
  },
  refresh: function(){ this.state.apps.fetch({reset: true}) },
  update: function(){
    this.setState({apps: this.state.apps});
  },
  render: function() {
    var appNodes = this.state.apps.map(function (app) {
      return (
        <AppComponent key={app.id} app={app}/>
      );
    });
    return <div>
      {appNodes}
      <br/>
      <NewAppComponent apps={this.state.apps}/>
    </div>;
  }
});

exports = module.exports = AppsComponent;
