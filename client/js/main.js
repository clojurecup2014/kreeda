/** @jsx React.DOM */

var $ = require('jquery'),
    React=require('react');

window.jQuery=$;
window.React=React;
var Backbone=require('backbone');
Backbone.$=$;

var Router = require('./components/router');

var KreedaApp = React.createClass({
  render: function(){
    return <Router/>;
  }
});

var rootElem = document.getElementById('kreeda-app');
if(rootElem) {
  React.renderComponent(<KreedaApp/>, rootElem);
}
