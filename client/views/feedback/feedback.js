/*------------------------------------------------------------------------------------------------------------------------------*/
Template.comment.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.comment.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.comment.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.comment.events({
    'click #saveBtnID': function(e) {
        actions.save(e, this);
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.comment.rendered = function() {
    $("form").submit(function() { return false; });
};
/*------------------------------------------------------------------------------------------------------------------------------*/
var actions = function () {
    var oPublic = {};
    /*-------------------------*/
    oPublic.save = function(e, data) {
        e.preventDefault();
        //$(e.target).addClass('disabled');

        if(!Meteor.user()){
            throwError('You must login to create a comment');
            //$(e.target).removeClass('disabled');
            return false;
        }

        // CREATE OBJECT
        var doc = {
            subject: $('#subjectID').val()
            ,title: $('#titleID').val()
            ,description: $('#descriptionID').val()
            ,private: $('#privateID').prop('checked')
        };

        // VALIDATE
        if (validateComment(doc)){
            return false;
        }
        Comments.insert(doc);
        //Meteor.call('Comments.insert', doc, function(error, retValue) {
        //    if(error){
        //        console.log("feedback.js/2", "Comments.insert", {'error': error, 'retValue': retValue});
        //        throwError(error.reason);
        //    }else{
        //        throwSuccess('Thanks! Feedback saved.');
        //        Router.go('/');
        //    }
        //});
        throwSuccess('Thanks! Feedback saved.');
        Router.go('/');
        return true;
    };
    /*-------------------------*/
    return oPublic;
}();
