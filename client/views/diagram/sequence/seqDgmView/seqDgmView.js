/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmView.helpers({
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
Template.seqDgmView.created = function() {
    historySearchForm.setDocId(this.data._id);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmView.destroyed = function() {
    historySearchForm.setDocId(null);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmView.events({
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
Template.seqDgmView.rendered = function() {
    $('#info').hide();
    $("form").submit(function() { return false; });

    try {
        var style = this.data.style;
        var code = this.data.code;
        var type = this.data.type;

        $('#diagram').html('');
        $('#htmlHeader').html( this.data.htmlHeader );
        $('#htmlFooter').html( this.data.htmlFooter );

        if (type=='ctx') {
            var htmlString = ContextDiagramUtils.parseCode(code, style);
            $('#diagram').html(htmlString);
        } else if (type=='act') {
            var htmlString = ContextDiagramUtils.activity(code, style);
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
var actions = function () {
    var oPublic = {};
    /*-------------------------*/
    oPublic.copy = function(e, data){
        e.preventDefault();
        Meteor.call('Diagrams.copy', data._id, function(error, _id) {
            if(error){
                console.log("seqDgmView.js/3", "Diagrams.copy", {'error': error, 'retValue': _id});
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
                console.log("seqDgmView.js/1", "Diagrams.deleted", {'error': error, 'retValue': retValue});
            }else{
                throwSuccess('Diagram deleted.  Archived copy in history.');
                Router.go('/diagrams');
            }
        });
    };
    /*-------------------------*/
    return oPublic;
}();