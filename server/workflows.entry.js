Meteor.startup(function() {
  return AccountsEntry.config({
    signupCode: DefaultProperties.signupcode,
    defaultProfile: {
      someDefault: 'homePage'
    }
  });
});
