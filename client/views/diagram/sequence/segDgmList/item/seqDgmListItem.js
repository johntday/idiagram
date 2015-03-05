/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmListItem.helpers({
    createdAgo: function(){
        return (this.createdAt) ? moment(this.createdAt).fromNow() : 'unknown';
    },
    updatedAgo: function(){
        return (this.updatedAt) ? moment(this.updatedAt).fromNow() : 'never';
    },
    hasUpdateInfo: function(){
        return (this.updateUserId);
    },
    star: function(){
        return Diagrams.isStar(this.starredBy)? 'star' : 'star-o';
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
    'click #starBtnID': function(e){
        e.preventDefault();
        var userId = Meteor.userId();
        if(!userId){
            throwError('You must login to play with stars');
            return false;
        }
        if ( Diagrams.isStar(this.starredBy) ){
            Diagrams.removeStar(this._id);
        } else {
            Diagrams.addStar(this._id);
        }
    }

});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmListItem.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
