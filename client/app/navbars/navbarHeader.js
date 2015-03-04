
// ---------------------------------------------------------------
Template.navbarHeader.events({
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
