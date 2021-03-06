
if (typeof UI !== "undefined") {
  UI.registerHelper("signedInAs", function(date) {
    if (Meteor.user().username) {
      return Meteor.user().username;
    } else if (Meteor.user().profile.name) {
      return Meteor.user().profile.name;
    } else if (Meteor.user().emails && Meteor.user().emails[0]) {
      return Meteor.user().emails[0].address;
    } else {
      return "Signed In";
    }
  });
}

UI.registerHelper('accountButtons', function() {
  return new UI.SafeString(Template.entryAccountButtons());
});
UI.registerHelper('capitalize', function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
UI.registerHelper('signupClass', function() {
  if (Accounts.oauth && Accounts.oauth.serviceNames().length > 0) {
    return "collapse";
  }
});
UI.registerHelper('otherLoginServices', function() {
  return Accounts.oauth && Accounts.oauth.serviceNames().length > 0;
});
UI.registerHelper('loginServices', function() {
  return Accounts.oauth.serviceNames();
});

UI.registerHelper('agoTime', function(context, options) {
    return moment(context).fromNow();
});
UI.registerHelper('formatTime', function(context, options) {
    return moment(context).format('MM/DD/YYYY hh:mm a');
});
UI.registerHelper('isAdmin', function(context, options) {
    return isAdmin();
});
UI.registerHelper('canEdit', function(ownerId, options) {
    return canEdit(ownerId);
});
UI.registerHelper('json', function(context, options) {
    return JSON.stringify(context, null, '\t');
});
