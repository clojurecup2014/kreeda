/** @jsx React.DOM */

var React = require('react');

var DashboardComponent = React.createClass({
  render: function(){
    return <div class="help">
      <h1>Using Kreeda</h1>
      <p>Thanks for signing up. The first thing you might want to do is head over to the <a href="#apps">apps</a> section and create a application.
        You will get a api-key and a api-secret. You can also create actions for the application.</p>
      <p>You will notice that you see a widget on the bottom right of the screen. This widget is powered by our Javascript SDK.
        Below is a quick overview of the Javascript SDK.</p>
      <h3>Step 1</h3>
      <p>Add the Javascript SDK to your page</p>
      <pre>
        <code>
          &lt;script src="http://kreeda.clojurecup.com/js/sdk.js"&gt;&lt;/script&gt;
        </code>
      </pre>
      <h3>Step 2</h3>
      <p>Initialize the SDK and register your logged in user with Kreeda. You can do this any number of times. Even during every page load</p>

      <pre>
        <code>
          var kreeda=new Kreeda({'{'}apiKey: 'yourapikey',apiSecret: 'yourApiSecret'{'}'});<br/>
          kreeda.createOrUpdateUser({'{'}name: 'App UserName', email: 'this@isoption.al', customer_id: 'youruniqueid'{'}'});<br/>
          // Please note that customer_id has to be unique within your application
        </code>
      </pre>

      <h3>Step 3</h3>
      <p>Publish your actions</p>
      <pre>
        <code>
          kreeda.publishAction('action_name',{'{'}further: {'{'}meta: data{'}'}{'}'})<br/>
          // Action name has to match what has been created for your app
        </code>
      </pre>
      <h3>Step 4</h3>
      <p>Render User profile</p>
      <pre>
        <code>
          kreeda.renderProfile(document.getElementById('profile'),'youruniqueid');<br/>
          // This renders the user profile. Style as per your taste.
        </code>
      </pre>
      <h3>Step 5</h3>
      <p>Profit!!!</p>
    </div>;
    

  }
});

exports = module.exports = DashboardComponent;
