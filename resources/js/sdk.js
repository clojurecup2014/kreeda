var Kreeda = ( function (window, undefined) {
  var slice = Array.prototype.slice;

  function timestamp() {
    var time = new Date();
    return  time.getDate() + '-' + time.getMonth() + '-' + time.getFullYear() + ' '
    time.getHours() + ':' + time.getMinutes() + '-' + time.getSeconds();
  }

  function log(level, message) {
    console.log.apply(console, '[' + timestamp() + ']' + ' [' + level.toUpperCase() + '] ',
                      message,
                      slice(arguments, 2));
  }

  window.Kreeda = function (options) {
    _.defaults(options, { debug: false });
    if ( !('apiKey' in options || 'apiSecret' in options) ) {
      throw 'Must supply an apiKey and apiSecret';
    }
    this.views = {
      profile: {
        url: function (user_id) { return '/users/' + user_id + '/profile'; },
        template: _.template('<h1><%= user.name %></h1>')
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
  }

  Kreeda.prototype.log = function (level, message) {
    if (this.debug) { log(level, message); }
  };

  Kreeda.prototype.ajax = function (route, options) {
    var baseUrl = 'http://kreeda.clojurecup.com';
    var defaultHeaders = {
      api_key: this.apiKey,
      api_secret: this.apiSecret
    };
    if ( 'headers' in options ) {
      _.extend(options.headers, defaultHeaders);
    }
    return $.ajax(baseUrl + route, options);
  };

  Kreeda.prototype.createOrUpdateUser = function (profile) {
    return this.ajax('/users', {
      data: profile,
      method: post,
      context: this
    }).done(function (data, textStatus, jqXHR) {
      this.log('info', 'User Profile', data);
      // TODO: Create Session Cookie for user.
    }).fail(function (jqXHR, textStatus, errorThrown) {
      this.log('error', 'Failed to createOrUpdateUser for:', profile);
    });
  };

  Kreeda.prototype.publishAction = function (name, data) {
    _.extend(data, {
      name: name
    });
    return this.ajax('/actions', {
      data: data,
      method: post,
      context: this
    }).done(function (data, textStatus, jqXHR) {
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
    var args = slice(arguments, 2);
    var url = _.isFunction(view.url) ? view.url.apply(this, args) : view.url;
    return $.getJSON(url).done(function (data) {
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
  }

  Kreeda.prototype.renderLeaderBoard = function (element) {
    return this.render('leaderBoard', element);
  };

  return Kreeda;
} )( window );
