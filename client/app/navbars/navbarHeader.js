
// ---------------------------------------------------------------
Template.navbarHeader.events({
    'click #seqCreate': CommonTemplateEvents['click #seqCreate'],
    'click #ctxCreate': CommonTemplateEvents['click #ctxCreate'],
    'click #navID': function(e){
        e.preventDefault();
        toggleWestPanel();
    }
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
