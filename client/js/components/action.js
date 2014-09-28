/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react');

var ActionComponent = React.createClass({
  getInitialState: function() {
    return {editing: false};
  },
  handleEdit: function() {
    this.setState({editing: true});
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
    if ( this.state.editing ) {
      <li key={this.props.action.id}>
      <form className="form-horizontal" role="form" onSubmit={this.handleUpdate}>
      <div className="form-group">
      <label htmlFor={"action-name"+this.props.action.id}>Name: </label>
        <input type="text" className="form-control" id={"action-name"+this.props.action.id} name="name" value={this.props.action.name}/>
      </div>
      <div className="form-group">
      <label htmlFor={"action-points"+this.props.action.id}>Points: </label>
      <input type="text" className="form-control" id={"action-points"+this.props.action.id} name="points" value={this.props.action.points}/>
      </form>
      </li>
    } else {
      return (
        <li key={this.props.action.id}>
        <div><span>Name: </span><span>{this.props.action.name}</span></div>
        <div><span>Points: </span><span>{this.props.action.points}</span></div>
        <button onClick={this.handleEdit}>Edit</button>
        </li>
      );
    }
  }
});

exports = module.exports = ActionComponent;
