/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react'),
    Backbone = require('backbone'),
    AppComponent = require('./app');

var AppModel = Backbone.Model.extend({
});

var AppsCollection = Backbone.Collection.extend({
  model: AppModel,
  url: "/applications",
  createApp: function(appName){
    this.create({name: appName},{wait: true});
  }
});

var NewAppComponent = React.createClass({
  handleKeyDown: function(e){
    if(e.keyCode!==13) return;
    var appName=e.target.value;
    this.props.apps.createApp(appName);
    e.target.value='';
  },
  render: function(){
    return <li>
    <input type="text" placeholder="enterAppName" onKeyDown={this.handleKeyDown}/>
    </li>
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
  },
  refresh: function(){ this.state.apps.fetch({reset: true}) },
  update: function(){
    this.setState({apps: this.state.apps});
  },
  render: function() {
    var appNodes = this.state.apps.map(function (app) {
      return (
        <AppComponent app={app}/>
      );
    });
    return <ul>
      {appNodes}
      <NewAppComponent apps={this.state.apps}/>
    </ul>;
  }
});

exports = module.exports = AppsComponent;
