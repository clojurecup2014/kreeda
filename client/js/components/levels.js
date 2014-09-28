/** @jsx React.DOM */

var $ = require('jquery'),
    React = require('react');

var LevelsComponent = React.createClass({
  getInitialState: function() {
    return {levels: []};
  },
  componentWillMount: function() {
    var self = this;
    $.getJSON('/apps/' + this.state.applicationId + '/levels', function(result) {
      self.setState({levels: result});
    });
  },
  render: function(){
    var levelComponents = this.state.levels.map(function(level) {
      <Level level={level}/>
    });
    return <ul>
      {levelComponents}
    </ul>;
  }
});

exports = module.exports = LevelsComponent;
