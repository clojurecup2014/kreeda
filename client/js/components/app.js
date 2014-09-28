/** @jsx React.DOM */

var React = require('react');

var AppComponent = React.createClass({
  render: function() {
    var app=this.props.app.attributes;
    return (
      <div className='col-md-4'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h2 className='panel-title'>{'App: ' + app.name}</h2>
          </div>
          <div className='panel-body'>
            <div>
              <span>App Key: </span>
              <br/>
              <span>
                <strong>{app.api_key}</strong>
              </span>
            </div>
            <div>
              <span>App Secret: </span>
              <br/>
              <span>
                <strong>{app.api_secret}</strong>
              </span>
            </div>
            <hr/>
            <div className='col-md-4'>
              <a className='btn btn-primary' href={'#apps/' + app.id + '/actions'}>Actions</a>
            </div>
            <div className='col-md-4'>
              <a className='btn btn-primary' href={'#apps/' + app.id + '/trophies'}>Trophies</a>
            </div>
            <div className='col-md-4'>
              <a className='btn btn-primary' href={'#apps/' + app.id + '/levels'}>Levels</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

exports = module.exports = AppComponent;
