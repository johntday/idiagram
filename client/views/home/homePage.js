/*------------------------------------------------------------------------------------------------------------------------------*/
Template.homePage.helpers({
    allCnt: function(){
        return diagramCnts.get('all');
    },
    privateCnt: function(){
        return diagramCnts.get('private');
    },
    publicCnt: function(){
        return diagramCnts.get('public');
    },
    starredCnt: function(){
        return diagramCnts.get('starred');
    },
    otherStarredCnt: function(){
        return diagramCnts.get('otherStarred');
    },
    diagramsLastModified: function(){
        return (Meteor.user()) ? Meteor.user().profile.lastModified : [];
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.homePage.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.homePage.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.homePage.events({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.homePage.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
