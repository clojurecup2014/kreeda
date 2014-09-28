/** @jsx React.DOM */

var React = require('react');

var ProfileComponent = React.createClass({
  render: function(){
    return <div className="kreeda-profile"/>;
  },
  componentDidUpdate: function(){
    if(!this.props.currentUser) return;
    var element = this.getDOMNode();
    setInterval(function(){
      kreeda.renderProfile(element, this.props.currentUser.id);
    }.bind(this),1000);
  }
});
module.exports = ProfileComponent;
