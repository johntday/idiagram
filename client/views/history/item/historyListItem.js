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
    //},
    //'click a.list-group-item': function(e){
    //    e.preventDefault();
    //
    //    var _id = $(e.currentTarget).attr('data-id');
    //
    //    dialog('Restore diagram?', {
    //        align: 'center',
    //        context: {
    //            _id: _id
    //        },
    //        callback: function(){
    //            var history = Historys.findOne(_id);
    //            if (!history)
    //                throwError('Problem getting history record');
    //
    //            Meteor.call('Diagrams.insert', history.doc, function(error, _id) {
    //                if(error){
    //                    console.log("seqDgm.js/1", "Diagrams.insert", {'error': error, 'retValue': _id});
    //                    throwError(error.reason);
    //                }else{
    //                    throwSuccess('Diagram restored');
    //                    Router.go('/diagram/' + _id);
    //                }
    //            });
    //        }
    //    });
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyListItem.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
