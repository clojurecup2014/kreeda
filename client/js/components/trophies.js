/** @jsx React.DOM */

var React = require('react');

var TrophiesComponent = React.createClass({
  getInitialState: function() {
    return {trophies: []};
  },
  componentWillMount: function() {
    var self = this;
    $.getJSON('/apps/' + this.state.applicationId + '/trophies', function(result) {
      self.setState({trophies: result});
    });
  },
  render: function () {
    var trophyComponents = this.state.trophies.map(function (trophy) {
      <Trophy trophy={trophy}/>
    });
    return <ul>
      {trophyComponents}
    </ul>;
  }
});

exports = module.exports = TrophiesComponent;
