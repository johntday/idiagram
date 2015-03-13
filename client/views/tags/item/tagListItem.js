/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagListItem.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagListItem.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagListItem.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagListItem.events({
    'click #deleteBtnID': function(e){
        e.preventDefault();
        var _id = $(e.currentTarget).attr('data-id');

        e.stopImmediatePropagation();

        Meteor.call('Tags.delete', _id, function(error, retValue) {
            if(error){
                console.log("tagListItem.js/1", "Tags.delete", {'error': error, 'retValue': retValue});
            }
        });
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagListItem.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
