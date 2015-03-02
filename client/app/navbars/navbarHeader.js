
// ---------------------------------------------------------------
// template events

Template.navbarHeader.events({
  'click #logOutLink':function(){
    Router.go('/sign-out');
  },
    'click #eastPanelToggleLink':function(){
        toggleEastPanel();
    },
    'click #westPanelToggleLink':function(){
        toggleWestPanel();
    }

});

// ---------------------------------------------------------------
// template helpers

Template.navbarHeader.helpers({
  getUserName: function(){
      return getDisplayUsername(Meteor.user());
  }
});
