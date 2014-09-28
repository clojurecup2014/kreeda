/** @jsx React.DOM */

var React=require('react');
var $ = require('jquery');
window.jQuery=$;
var Backbone=require('backbone');
Backbone.$=$;
var DashboardComponent = require('./dashboard');
var LevelsComponent = require('./levels');
var createRouter=function(component){
  router = Backbone.Router.extend({
    routes: {
      "dashboard": "dashboard",
      "applications/:id/levels": "noneyet"
    },
    dashboard: function(){
      component.setState({nowViewing: 'dashboard'});
    },
    noneyet: function(id){
      console.log("asdf");
      component.setState({nowViewing: 'levels',meta: {applicationId: id}});
    },
  });
  return new router();
};
var Router = React.createClass({
  getInitialState: function(){
    return {nowViewing: 'none'};
  },
  componentWillMount: function(){
    console.log("called again");
    var router=createRouter(this);
    Backbone.history.start();
  },
  render: function(){
    console.log("rendering....");
    var views = {'dashboard': DashboardComponent,'levels': LevelsComponent};
    var nestedComponent = views[this.state.nowViewing];
    console.log(nestedComponent);
    return nestedComponent ? nestedComponent(this.state.meta) : <div/>;
  }
});
module.exports = Router;
