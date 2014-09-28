/** @jsx React.DOM */

var React=require('react');
var $ = require('jquery');
var dropdown = require('bootstrap/js/dropdown');
var HeaderComponent = React.createClass({
  getInitialState: function(){
    return {currentUser: {}};
  },
  componentWillMount: function(){
    var self=this;
    $.getJSON("/current_user").then(function(result){
      self.setState({currentUser: result});
    });
  },
  render: function(){
    return (
  <header className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand">Kreeda</a>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.state.currentUser.name}<b className="caret"></b></a>
        <ul className="dropdown-menu">
          <li><a href="#">Logout</a></li>
        </ul>
        </li>
      </ul>
      <nav className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className="active"><a href="#dashboard">Dashboard</a></li>
          <li><a href="#applications/23/levels">Apps</a></li>
          <li><a href="/">Actions</a></li>
          <li><a href="/">Levels</a></li>
          <li><a href="/">Trophies</a></li>
        </ul>
      </nav>
    </div>
  </header>
    );
  }
});
module.exports=HeaderComponent;
