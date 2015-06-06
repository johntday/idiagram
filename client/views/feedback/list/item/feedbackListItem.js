/*------------------------------------------------------------------------------------------------------------------------------*/
Template.feedbackListItem.helpers({
    star: function(){
        return Diagrams.isStar(this.starredBy)? 'star' : 'star-o';
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.feedbackListItem.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.feedbackListItem.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.feedbackListItem.events({
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
Template.feedbackListItem.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
