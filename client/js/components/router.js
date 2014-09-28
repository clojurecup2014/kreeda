/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react');

window.jQuery = $;
var Backbone = require('backbone');
Backbone.$ = $;

var HeaderComponent = require('./header'),
    DashboardComponent = require('./dashboard'),
    LevelsComponent = require('./levels'),
    AppsComponent = require('./apps'),
    AppComponent = require('./app'),
    LevelsComponent = require('./levels'),
    LevelComponent = require('./level'),
    ActionsComponent = require('./actions'),
    ActionComponent = require('./action'),
    TrophiesComponent = require('./trophies'),
    TrophyComponent = require('./trophy');

var createRouter = function(component) {
  var renderView = function(view, params) {
    var viewOptions = {
      nowViewing: view,
      params: params
    };
    component.setState(viewOptions);
  };
  var Router = Backbone.Router.extend({
    routes: {
      "dashboard": "dashboard",
      "apps": "apps",
      "apps/:id/levels": "appLevels",
      "apps/:id/actions": "appActions",
      "apps/:id/trophies": "appTrophies"
    },
    dashboard: function() {
      renderView('dashboard');
    },
    apps: function() {
      renderView('apps');
    },
    appLevels: function(id) {
      renderView('levels', {applicationId: id});
    },
    appActions: function(id) {
      renderView('actions', {applicationId: id});
    },
    appTrophies: function(id) {
      renderView('trophies', {applicationId: id});
    }
  });
  return new Router();
};

var Router = React.createClass({
  getInitialState: function(){
    this.views = {
      'dashboard': DashboardComponent,
      'apps': AppsComponent,
      'app': AppComponent,
      'levels': LevelsComponent,
      'level': LevelComponent,
      'actions': ActionsComponent,
      'action': ActionComponent,
      'trophies': TrophiesComponent,
      'trophy': TrophyComponent
    };
    return {
      currentUser: {},
      nowViewing: 'none'
    };
  },
  componentWillMount: function() {
    var self = this;
    $.getJSON("/current_user").then(function(result) {
      self.setState({currentUser: result});
    });
    createRouter(this);
    Backbone.history.start();
  },
  render: function() {
    var nestedComponent = this.views[this.state.nowViewing];
    var view = nestedComponent ? nestedComponent(this.state.params) : <div/>;
    return <div>
      <HeaderComponent nowViewing={this.state.nowViewing} username={this.state.currentUser.name}/>
      <div className="main container">{view}</div>
    </div>;
  }
});

exports = module.exports = Router;
