Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.startup(function() {
  return AccountsEntry.config({
    privacyUrl: '/privacy',
    termsUrl: '/eula',
    homeRoute: '/',
    dashboardRoute: '/',
    profileRoute: 'profile',
    showSignupCode: true
  });
});
