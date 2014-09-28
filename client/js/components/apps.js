/** @jsx React.DOM */

var React = require('react');

var AppsComponent = React.createClass({
  componentWillMount: function() {
    var self = this;
    $.getJSON('/applications', function(data) {
      self.setState({apps: data});
    });
  },
  render: function() {
    var appNodes = this.state.apps.map(function (app) {
      return (
        <App app={app}/>
      );
    });
    return <ul>
      {appNodes}
    </ul>;
  }
});

exports = module.exports = AppsComponent;
