/** @jsx React.DOM */

var React=require('react');
    require('bootstrap/js/dropdown');

var HeaderComponent = React.createClass({
  getInitialState: function() {
    var self = this;
    return {
      isActive: function(name) {
        return RegExp(name).test(self.props.nowViewing) ? 'active' : '';
      }
    };
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
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">{this.props.username}<b className="caret"></b></a>
              <ul className="dropdown-menu">
                <li><a href="/logout">Logout</a></li>
              </ul>
            </li>
          </ul>
          <nav className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className={this.state.isActive('dashboard')}><a href="#dashboard">Dashboard</a></li>
              <li className={this.state.isActive('apps')}><a href="#apps">Apps</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
});

exports = module.exports = HeaderComponent;
