/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmView.helpers({
    canEdit: function(){
        return canEdit(this.userId);
    },
    star: function(){
        return Diagrams.isStar(this.starredBy)? 'star' : 'star-o';
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
