Meteor.startup(function() {
  return AccountsEntry.config({
    signupCode: AppProperties.signupcode,
    defaultProfile: {
      someDefault: 'homePage'
    }
  });
});
