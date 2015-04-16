CommonTemplateEvents = function(){
    var oPublic = {};

    oPublic['click #seqCreate'] = function(e){
        e.preventDefault();

        if(!Meteor.user()){
            throwError('You must login to create a diagram');
            return false;
        }

        // CREATE OBJECT
        var doc = Constants.seqDefault;

        Meteor.call('Diagrams.insert', doc, function(error, _id) {
            if(error){
                throwError(error.reason);
                console.log("navbarHeader.js/1", "Diagrams.insert", {'error': error, 'retValue': _id});
            }else{
                Router.go('/diagram/' + _id);
            }
        });
    };

    oPublic['click #ctxCreate'] = function(e){
        e.preventDefault();

        if(!Meteor.user()){
            throwError('You must login to create a diagram');
            return false;
        }

        // CREATE OBJECT
        var doc = Constants.ctxDefault;

        Meteor.call('Diagrams.insert', doc, function(error, _id) {
            if(error){
                throwError(error.reason);
                console.log("navbarHeader.js/2", "Diagrams.insert", {'error': error, 'retValue': _id});
            }else{
                Router.go('/diagram/' + _id);
            }
        });
    };


    return oPublic;
}();