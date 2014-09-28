/** @jsx React.DOM */

var React = require('react');

var AppComponent = React.createClass({
  trashApp: function (e) {
    e.preventDefault();
    this.props.app.destroy({wait: true});
  },
  render: function() {
    var app=this.props.app.attributes;
    return (
      <div className='col-md-4'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <div className='pull-right'><a className='fa fa-trash' onClick={this.trashApp} href='#'></a></div>
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
            <a className='btn btn-primary' href={'#apps/' + app.id + '/actions'}>Actions</a>
          </div>
        </div>
      </div>
    );
  }
});

exports = module.exports = AppComponent;
