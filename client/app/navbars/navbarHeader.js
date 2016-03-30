
// ---------------------------------------------------------------
Template.navbarHeader.events({
    'click #seqCreate': CommonTemplateEvents['click #seqCreate'],
    'click #ctxCreate': CommonTemplateEvents['click #ctxCreate'],
    'click #actCreate': CommonTemplateEvents['click #actCreate'],
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
    },
    isDeviceSupported: function(){
        return Meteor.Device.isDesktop() || Meteor.Device.isTablet();
    }
});
