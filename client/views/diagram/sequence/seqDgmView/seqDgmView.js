/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmView.helpers({
    canEdit: function(){
        return canEdit(this.userId);
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
        if (canEdit(this.userId))
            Router.go('/diagram/' + this._id);
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmView.rendered = function() {

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
