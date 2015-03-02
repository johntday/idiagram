/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmListItem.helpers({
    createdAgo: function(){
        return (this.createdAt) ? moment(this.createdAt).fromNow() : 'unknown';
    },
    updatedAgo: function(){
        return (this.updatedAt) ? moment(this.updatedAt).fromNow() : 'never';
    },
    owner: function(){
        return (this.username) ? this.username : 'unknown';
    },
    hasUpdateInfo: function(){
        return (this.updateUserId);
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmListItem.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmListItem.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmListItem.events({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmListItem.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
