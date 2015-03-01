Meteor.startup(function() {
  return AccountsEntry.config({
    signupCode: 'photon',
    defaultProfile: {
      someDefault: 'homePage'
    }
  });
});
