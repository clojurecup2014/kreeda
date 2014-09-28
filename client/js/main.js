/** @jsx React.DOM */

var React=require('react');
var $ = require('jquery');
window.jQuery=$;
var Backbone=require('backbone');
Backbone.$=$;
var HeaderComponent = require('./components/header');
var Router = require('./components/router');
window.React=React;

var KreedaApp = React.createClass({
  render: function(){
    return <div>
      <HeaderComponent/>
      <div className="main container">
        <Router/>
      </div>
    </div>;
  }
});
var rootElem=document.getElementById('kreeda-app');
if(rootElem) {
  React.renderComponent(<KreedaApp/>,rootElem);
}
