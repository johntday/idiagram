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
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmView.destroyed = function() {
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
        var options = {theme: this.data.style};
        var code = this.data.code;
        var diagram = Diagram.parse( code );
        $('#diagram').html('');
        diagram.drawSVG('diagram', options);
    } catch (err) {
        throwError("Sorry, I cannot understand your diagram text");
    }
};
/*------------------------------------------------------------------------------------------------------------------------------*/
var actions = function () {
    var oPublic = {};
    /*-------------------------*/
    oPublic.delete = function(e, data) {
        e.preventDefault();

        Meteor.call('Diagrams.delete', data._id, function(error, retValue) {
            if(error){
                console.log("seqDgmView.js/1", "Diagrams.deleted", {'error': error, 'retValue': retValue});
            }else{
                throwSuccess('Diagram deleted');
                Router.go('/diagrams');
            }
        });
    };
    /*-------------------------*/
    return oPublic;
}();