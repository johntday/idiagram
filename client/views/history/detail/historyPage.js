/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.helpers({
    canEdit: function(){
        return canEdit(this.userId);
    },
    actionDesc: function(){
        return Historys.actionDescription(this);
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.events({
    'click #restoreBtnID': function(e) {
        e.preventDefault();

        var _id = this._id;
        var doc = _.omit(this.doc, '_id');

        dialog('Restore diagram?', {
            align: 'center',
            context: {
                _id: _id,
                doc: doc
            },
            callback: function(){

                Meteor.call('Diagrams.insert', doc, function(error, _id) {
                    if(error){
                        console.log("historyPage.js/1", "Diagrams.insert", {'error': error, 'retValue': _id});
                        throwError(error.reason);
                    }else{
                        throwSuccess('Diagram restored');
                        Router.go('/diagram/' + _id);
                    }
                });
            }
        });
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.rendered = function() {
    var doc = this.data.doc;

    try {
        var options = {theme: doc.style};
        var diagram = Diagram.parse( doc.code );
        $('#diagram').html('');
        diagram.drawSVG('diagram', options);
    } catch (err) {
        throwError("Sorry, I cannot understand your diagram text");
    }
};
/*------------------------------------------------------------------------------------------------------------------------------*/
