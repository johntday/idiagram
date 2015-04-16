var _setTimeoutID;
var code;
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgmView.helpers({
    star: function(){
        return Diagrams.isStar(this.starredBy) ? 'star' : 'star-o';
    },
    lock: function(){
        return (this.private) ? 'lock' : 'unlock';
    },
    hasTags: function(){
        return Diagrams.hasTags(this);
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgmView.created = function() {
    historySearchForm.setDocId(this.data._id);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgmView.destroyed = function() {
    historySearchForm.setDocId(null);
    Meteor.clearTimeout( _setTimeoutID );
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgmView.events({
    'click #editBtnID': function(e) {
        e.preventDefault();
        Router.go('/diagram/' + this._id);
    },
    'click #shareBtnID': function(e) {
        e.preventDefault();
        growl(/*'Copy me...\n' + */Meteor.absoluteUrl() + 'view/' + this._id,{
            type: 'w',
            width: 400,
            delay: 12000,
            align: 'center'
        });
    },
    'click #infoBtnID': function(e) {
        e.preventDefault();
        var $info = $('#info');
        $info.toggle('slow');
    },
    'click #copyBtnID': function(e) {
        actions.copy(e, this);
    },
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
    },
    'click #deleteBtnID': function(e) {
        actions.delete(e, this);
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgmView.rendered = function() {
    $('#info').hide();
    $("form").submit(function() { return false; });
    var code = this.data.code;

    _setTimeoutID = Meteor.setTimeout(function(){
        var graph = ContextDiagramUtils.parseCode( code, true );
        var options = {
            width: $('#context-div').width(),
            height: 500,
            graphSelector: '#context',
            showParseErr: true
        };
        FlatGraph(graph, options);

        PowerGraph(ContextDiagramUtils.cloneGraph(graph), _.extend(options, {graphSelector: '#powergraph'}));
    }, 200);
    console.log($('#ctxDgmPage').height());
};
/*------------------------------------------------------------------------------------------------------------------------------*/
var actions = function () {
    var oPublic = {};
    /*-------------------------*/
    oPublic.copy = function(e, data){
        e.preventDefault();
        Meteor.call('Diagrams.copy', data._id, function(error, _id) {
            if(error){
                console.log("ctxDgm.js/3", "Diagrams.copy", {'error': error, 'retValue': _id});
                throwError(error.reason);
            }else{
                throwSuccess('Diagram copied');
                Router.go('/diagram/' + _id);
            }
        });
    };
    /*-------------------------*/
    oPublic.delete = function(e, data) {
        e.preventDefault();

        Meteor.call('Diagrams.delete', data._id, function(error, retValue) {
            if(error){
                console.log("ctxDgmView.js/1", "Diagrams.deleted", {'error': error, 'retValue': retValue});
            }else{
                throwSuccess('Diagram deleted.  Archived copy in history.');
                Router.go('/diagrams');
            }
        });
    };
    /*-------------------------*/
    return oPublic;
}();