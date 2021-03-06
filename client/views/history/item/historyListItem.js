/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyListItem.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyListItem.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyListItem.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyListItem.events({
    'click #deleteBtnID': function(e){
        e.preventDefault();
        var _id = $(e.currentTarget).attr('data-id');

        e.stopImmediatePropagation();

        Meteor.call('Historys.delete', _id, function(error, retValue) {
            if(error){
                console.log("historyListItem.js/1", "Historys.delete", {'error': error, 'retValue': retValue});
            }else{
                if (Router.current().route.getName() == 'historyRoute')
                    Router.go('/');
            }
        });
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyListItem.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
