/** @jsx React.DOM */

var React = require('react');

var AppComponent = React.createClass({
  render: function() {
    var app=this.props.app.attributes;
    return (
      <li key={app.id}>
      <div><span>App Name: </span><span>{app.name}</span></div>
      <div><span>App Key: </span><span>{app.api_key}</span></div>
      <div><span>App Secret: </span><span>{app.api_secret}</span></div>
      <a className='btn btn-default' href={'#apps/' + app.id + '/actions'}>Actions</a>
      <a className='btn btn-default' href={'#apps/' + app.id + '/trophies'}>Trophies</a>
      <a className='btn btn-default' href={'#apps/' + app.id + '/levels'}>Levels</a>
      </li>
    );
  }
});

exports = module.exports = AppComponent;
