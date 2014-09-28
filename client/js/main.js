/** @jsx React.DOM */

var React=require('react');
window.React=React;
var rootElem=document.getElementById('message');
if(rootElem) {
  React.renderComponent(<h1>From React</h1>,rootElem);
}
