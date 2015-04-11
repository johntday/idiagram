
// ---------------------------------------------------------------
Template.navbarHeader.events({
    'click #seqCreate': function(e){
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
    },
    'click #ctxCreate': function(e){
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
    }
});

// ---------------------------------------------------------------
Template.navbarHeader.helpers({
    getUserName: function(){
        return getDisplayUsername(Meteor.user());
    },
    showProductionDB: function(){
        return CommonClient.isProduction() && isAdmin();
    }
});
