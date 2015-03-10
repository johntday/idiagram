/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmListItem.helpers({
    star: function(){
        return Diagrams.isStar(this.starredBy)? 'star' : 'star-o';
    },
    lastModifiedAt: function(){
        if (!this.updatedAt)
            return this.createdAt;
        if (this.updatedAt > this.createdAt)
            return this.updatedAt;
        return this.createdAt;
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
