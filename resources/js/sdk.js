function timestamp() {
  var time = new Date();
  return  time.getDate() + '-' + time.getMonth() + '-' + time.getFullYear() + ' '
          time.getHours() + ':' + time.getMinutes() + '-' + time.getSeconds();
}

function log(level, message) {
  console.log.apply(console, '[' + timestamp() + ']' + ' [' + level.toUpperCase() + '] ',
                    message,
                    Array.prototype.slice(arguments, 2));
}

var Kreeda = function (options) {
  _.defaults(options, {
    debug: false
  });
  if ( !('apiKey' in options || 'apiSecret' in options) ) {
    throw 'Must supply an apiKey and apiSecret';
  }
  this.baseUrl = 'http://kreeda.clojurecup.com';
  this.profileTemplate = _.template('<h1><%= user.name %></h1>');
  this.loeaderBoardTemplate = _.template('<h1>Leader Board</h1>' + 
                                         '<ul>' +
                                          '<% _.forEach(leaders, function (leader) { %>' +
                                            '<li>' +
                                              '<%= leader.name %>' +
                                            '</li>' +
                                          '<% }); %>' +
                                         '</ul>');
  this.badgesTemplate = _.template('<h1>Badges</h1>' +
                                   '<ul>' +
                                    '<% _.forEach(badges, function (badge) { %>' +
                                      '<li>' +
                                        '<img src="<%= badge.icon %>"' +
                                        '<%= badge.name %>' +
                                      '</li>' +
                                    '<% }); %>' +
                                   '</ul>');
}

Kreeda.prototype.log = function (level, message) {
  if (this.debug) {
    log(level, message);
  }
};

Kreeda.prototype.ajax = function (route, options) {
  var defaultHeaders = {
    api_key: this.apiKey,
    api_secret: this.apiSecret
  };
  if ( 'headers' in options ) {
    _.extend(options.headers, defaultHeaders);
  }
  return $.ajax(this.baseUrl + route, options);
};

Kreeda.prototype.createOrUpdateUser = function (profile) {
  return this.ajax('/users', {
    method: post,
    data: profile
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
  this.ajax('/actions', {
    method: post,
    data: data
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
