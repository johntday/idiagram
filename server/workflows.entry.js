Meteor.startup(function() {
  return AccountsEntry.config({
    signupCode: appState.signupcode,
    defaultProfile: {
      someDefault: 'homePage'
    }
  });
});
