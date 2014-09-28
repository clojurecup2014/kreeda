/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react');

window.jQuery = $;
var Backbone = require('backbone');
Backbone.$ = $;

var HeaderComponent = require('./header'),
    DashboardComponent = require('./dashboard'),
    LevelsComponent = require('./levels');

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
      "applications/:id/levels": "appLevels",
      "applications/:id/actions": "appActions",
      "applications/:id/trophies": "appTrophies"
    },
    dashboard: function() {
      renderView('dashboard');
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
      'levels': LevelsComponent
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
      <div className="main container">
        {view}
      </div>
    </div>;
  }
});

exports = module.exports = Router;
