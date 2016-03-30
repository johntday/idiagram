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
    historySearchForm.setDocId(this.data.doc._id);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.destroyed = function() {
    historySearchForm.setDocId(null);
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
    try {
        var doc = this.data.doc;
        var style = doc.style;
        var code = doc.code;
        var type = doc.type;

        $('#diagram').html('');
        $('#htmlHeader').html( this.data.htmlHeader );
        $('#htmlFooter').html( this.data.htmlFooter );

        if (type=='ctx') {
            var htmlString = ContextDiagramUtils.parseCode(code, style);
            $('#diagram').html(htmlString);
        } else if (type=='seq') {
            var options = {theme: style};
            var diagram = Diagram.parse( code );
            diagram.drawSVG('diagram', options);
        }
    } catch (err) {
        throwError("Sorry, I cannot understand your diagram text");
    }
};
/*------------------------------------------------------------------------------------------------------------------------------*/
