/** @jsx React.DOM */

var React = require('react');

var ActionsComponent = React.creatClass({
  componentWillMount: function() {
    var self = this;
    $.getJSON('/apps/'+this.state.applicationId+'/actions', function(result) {
      self.setState({actions: result});
    });
  },
  render: function() {
    var actionComponents = this.state.actions.map(function(this){
      <Action action={this}/>
    });
    return <ul>
      {actionComponents} 
    </ul>;
  }
});

exports = module.exports = ActionsComponent;
