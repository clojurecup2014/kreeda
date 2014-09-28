/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react');

window.jQuery = $;
var Backbone = require('backbone');
Backbone.$ = $;

var DashboardComponent = require('./dashboard'),
    LevelsComponent = require('./levels');

var createRouter = function(component){
  var Router = Backbone.Router.extend({
    routes: {
      "dashboard": "dashboard",
      "applications/:id/levels": "appLevels"
    },
    dashboard: function() {
      component.setState({nowViewing: 'dashboard'});
    },
    appLevels: function(id) {
      component.setState({nowViewing: 'levels',meta: {applicationId: id}});
    },
  });
  return new Router();
};

var Router = React.createClass({
  getInitialState: function(){
    this.views = {
      'dashboard': DashboardComponent,
      'levels': LevelsComponent
    };
    return {nowViewing: 'none'};
  },
  componentWillMount: function() {
    createRouter(this);
    Backbone.history.start();
  },
  render: function() {
    var nestedComponent = this.views[this.state.nowViewing];
    return nestedComponent ? nestedComponent(this.state.meta) : <div/>;
  }
});

exports = module.exports = Router;
