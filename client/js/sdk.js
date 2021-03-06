var _ = require('lodash');
var $ = require('jquery');

var slice = Array.prototype.slice;

function timestamp() {
  var time = new Date();
  return  time.getDate() + '-' + time.getMonth() + '-' + time.getFullYear() + ' ' +
  time.getHours() + ':' + time.getMinutes() + '-' + time.getSeconds();
}

function log(level, message) {
  console.log.apply(console, '[' + timestamp() + ']' + ' [' + level.toUpperCase() + '] ',
                    message,
                    slice(arguments, 2));
}

var Kreeda = function (options) {
  _.defaults(options, { debug: false });
  if ( !('apiKey' in options || 'apiSecret' in options) ) {
    throw 'Must supply an apiKey and apiSecret';
  }
  this.apiKey = options.apiKey;
  this.apiSecret = options.apiSecret;
  this.views = {
    profile: {
      url: function (user_id) { return '/users/' + user_id + '/profile'; },
      template: _.template('<h2 class="name"><%= name %></h2>' +
                          '<h3 class="points"><%= earned_points %></h3>'+
                          '<span class="credit">Powered by Kreeda</span>')
    },
    leaderBoard: {
      url: '/leaderboard',
      template: _.template('<h1>Leader Board</h1>' +
                           '<ul>' +
                           '<% _.forEach(leaders, function (leader) { %>' +
                           '<li>' +
                           '<%= leader.name %>' +
                           '</li>' +
                           '<% }); %>' +
                           '</ul>')
    },
    trophies: {
      url: function (user_id) { return '/users/' + user_id + '/trophies'; },
      template: _.template('<h1>Badges</h1>' +
                           '<ul>' +
                           '<% _.forEach(badges, function (badge) { %>' +
                           '<li>' +
                           '<img src="<%= badge.icon %>"' +
                           '<%= badge.name %>' +
                           '</li>' +
                           '<% }); %>' +
                           '</ul>')
    }
  };
};

Kreeda.prototype.log = function (level, message) {
  if (this.debug) { log(level, message); }
};

Kreeda.prototype.ajax = function (route, options) {
  var baseUrl = 'http://kreeda.clojurecup.com/sdk';
  var defaultHeaders = {
    "-x-api-key": this.apiKey,
    "-x-api-secret": this.apiSecret
  };
  if ( 'headers' in options ) {
    _.extend(options.headers, defaultHeaders);
  } else {
    options.headers = defaultHeaders;
  }
  return $.ajax(baseUrl + route, options);
};

Kreeda.prototype.createOrUpdateUser = function (profile) {
  return this.ajax('/users', {
    data: JSON.stringify(profile),
    method: 'post',
    context: this,
    contentType: "application/json"
  }).done(function (data) {
    this.log('info', 'User Profile', data);
    // TODO: Create Session Cookie for user.
  }).fail(function (jqXHR, textStatus, errorThrown) {
    this.log('error',
             'Failed to createOrUpdateUser for:',
             profile,
            ' with status: ', textStatus,
            ' and error: ', errorThrown);
  });
};

Kreeda.prototype.publishAction = function (name, data) {
  var payload={name: name, meta: data};
  return this.ajax('/actions', {
    data: JSON.stringify(payload),
    method: 'post',
    context: this,
    contentType: "application/json"
  }).done(function (data) {
    this.log('info', 'Publish Action successful for: ', name, data);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    this.log('error',
             'Publish Action failed for: ',
             name,
             data,
             ' with status: ', textStatus,
             ' and error: ', errorThrown);
  });
};

Kreeda.prototype.render = function (viewName, element) {
  var view = this.views[viewName];
  // NOTE: Can be called with variable args.
  // eg.) render('profile', $('#element'), user_id);
  var args = slice.call(arguments, 2);
  var url = _.isFunction(view.url) ? view.url.apply(this, args) : view.url;
  return this.ajax(url, {
    method: 'get',
    context: this
  }).done(function (data) {
    element.innerHTML = view.template(data);
  });
};

Kreeda.prototype.renderProfile = function (element) {
  var user_id = arguments.length >= 2 ? arguments[1] : this.user.id;
  return this.render('profile', element, user_id);
};

Kreeda.prototype.renderTrophies = function (element) {
  var user_id = arguments.length >= 2 ? arguments[1] : this.user.id;
  return this.render('trophies', element, user_id);
};

Kreeda.prototype.renderLeaderBoard = function (element) {
  return this.render('leaderBoard', element);
};

module.exports= Kreeda;
window.Kreeda = Kreeda;
