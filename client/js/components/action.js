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
  handleUpdate: function (e) {
    e.preventDefault();
    var attributes = {
      name: this.refs.inputActionName.getDOMNode().value,
      points: parseInt(this.refs.inputActionPoints.getDOMNode().value)
    };
    var self = this;
    this.props.action.save(attributes, {
      wait: true,
      success: function () {
        self.toggleEdit();
      }
    });
  },
  deleteAction: function (e) {
    e.preventDefault();
    this.props.action.destroy({wait: true});
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
                    <label htmlFor={"action-name"+action.id}>Name: </label>
                    <input ref="inputActionName" type="text" className="form-control" id={"action-name"+action.id} name="name" defaultValue={action.name}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor={"action-points"+action.id}>Points: </label>
                    <input ref="inputActionPoints" type="text" className="form-control" id={"action-points"+action.id} name="points" defaultValue={action.points}/>
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
              <div className='pull-right'><a className='fa fa-trash' onClick={this.deleteAction} href='#'></a></div>
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
