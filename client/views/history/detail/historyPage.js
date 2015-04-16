var _setTimeoutID;
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.helpers({
    canEdit: function(){
        return canEdit(this.userId);
    },
    actionDesc: function(){
        return Historys.actionDescription(this);
    },
    isCtxDgm: function(){
        return this.doc.type == 'ctx';
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.created = function() {
    historySearchForm.setDocId(this.data.doc._id);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.destroyed = function() {
    historySearchForm.setDocId(null);
    Meteor.clearTimeout( _setTimeoutID );
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
    },
    'mouseenter #context-help, mouseenter #powergraph-help': function(e) {
        e.preventDefault();
        $(e.currentTarget).popover('show');
    },
    'mouseleave #context-help, mouseleave #powergraph-help': function(e) {
        e.preventDefault();
        $(e.currentTarget).popover('hide');
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyPage.rendered = function() {
    $('#context-help').popover({
        title: 'Context Diagram Help'
        ,content: '<ul><li><u>Drag nodes</u> to re-jigger the diagram</li>' +
        '<li><u>Double-click</u> to re-center diagram</li><li>Use <u>mouse-wheel</u> to zoom-in and out</li></ul>'
        ,placement: 'right'
        ,html: true
    });
    $('#powergraph-help').popover({
        title: 'Summary Diagram Help'
        ,content: '<ul><li><u>Drag nodes</u> to re-jigger the diagram.  Sometimes you need to jerk them to a good spot to uncross lines.</li>' +
        '<li><u>Double-click</u> to re-center diagram</li><li>Use <u>mouse-wheel</u> to zoom-in and out</li></ul>'
        ,placement: 'right'
        ,html: true
    });

    var doc = this.data.doc;

    if (doc.type == 'ctx'){
        _setTimeoutID = Meteor.setTimeout(function(){
            var graph = ContextDiagramUtils.parseCode( doc.code, true );
            var options = {
                width: $('#context-div').width(),
                height: 500,
                graphSelector: '#context',
                showParseErr: true
            };
            FlatGraph(graph, options);

            PowerGraph(ContextDiagramUtils.cloneGraph(graph), _.extend(options, {graphSelector: '#powergraph'}));
        }, 200);
    }else {
        try {
            var options = {theme: doc.style};
            var diagram = Diagram.parse(doc.code);
            $('#diagram').html('');
            diagram.drawSVG('diagram', options);
        } catch (err) {
            throwError("Sorry, I cannot understand your diagram text");
        }
    }
};
/*------------------------------------------------------------------------------------------------------------------------------*/
