
// ---------------------------------------------------------------
Template.navbarHeader.events({
    'click #eastPanelToggleLink':function(){
        toggleEastPanel();
    },
    'click #westPanelToggleLink':function(){
        toggleWestPanel();
    }

});

// ---------------------------------------------------------------
Template.navbarHeader.helpers({
    getUserName: function(){
        return getDisplayUsername(Meteor.user());
    },
    isAdmin: function(){
        return isAdmin(Meteor.user());
    }
});
