/** @jsx React.DOM */

var $ = require('jquery'),
    React=require('react');
    require('bootstrap/js/dropdown');

var HeaderComponent = React.createClass({
  getInitialState: function() {
    var self = this;
    return {
      currentUser: {},
      isActive: function(name) {
        return self.props.nowViewing === name ? 'active' : '';
      }
    };
  },
  componentWillMount: function() {
    var self=this;
    $.getJSON("/current_user").then(function(result) {
      self.setState({currentUser: result});
    });
  },
  render: function() {
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
              <li className={this.state.isActive('dashboard')}><a href="#dashboard">Dashboard</a></li>
              <li className={this.state.isActive('actions')}><a href="#applications/23/actions">Actions</a></li>
              <li className={this.state.isActive('trophies')}><a href="#applications/23/trophies">Trophies</a></li>
              <li className={this.state.isActive('levels')}><a href="#applications/23/levels">Levels</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
});

exports = module.exports = HeaderComponent;
