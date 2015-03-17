
// ---------------------------------------------------------------
Template.navbarHeader.events({
});

// ---------------------------------------------------------------
Template.navbarHeader.helpers({
    getUserName: function(){
        return getDisplayUsername(Meteor.user());
    },
    showProductionDB: function(){
        return CommonClient.isProduction() && isAdmin();
    }
});
