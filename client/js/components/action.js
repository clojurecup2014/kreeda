/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react');

var ActionComponent = React.createClass({
  getInitialState: function() {
    return {editing: false};
  },
  toggleEdit: function() {
    this.setState({editing: !this.state.editing});
  },
  handleUpdate: function () {
    $.ajax({
      url: '/apps/' + this.state.applicationId + '/action/' + this.props.action.id,
      data: $(this).serialize(),
      method: 'post',
      context: this
    }).done(function (data, textStatus, jqXHR) {
      console.log("Action Updated");
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log("Action Update Failed");
    });
  },
  render: function () {
    var action = this.props.action.attributes;
    if ( this.state.editing ) {
      return (
        <div className='col-md-4'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h2 className='panel-title'>Edit Action</h2>
            </div>
            <div className='panel-body'>
              <div className='col-md-12'>
                <form className="form-horizontal" role="form" onSubmit={this.handleUpdate}>
                  <div className="form-group">
                    <label htmlFor={"action-name"+this.props.action.id}>Name: </label>
                    <input type="text" className="form-control" id={"action-name"+this.props.action.id} name="name" value={this.props.action.name}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor={"action-points"+this.props.action.id}>Points: </label>
                    <input type="text" className="form-control" id={"action-points"+this.props.action.id} name="points" value={this.props.action.points}/>
                  </div>
                  <button type='submit' className='btn btn-primary'>Update</button>
                  <button className='btn btn-default' onClick={this.toggleEdit}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='col-md-4'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h2 className='panel-title'>{'Action: ' + action.name}</h2>
            </div>
            <div className='panel-body'>
              <div className='pull-right'>
                <a className='btn btn-primary' onClick={this.toggleEdit}>Edit</a>
              </div>
              <div>
                <span>Points: </span>
                <span>
                  <strong>{action.points}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
});

exports = module.exports = ActionComponent;
