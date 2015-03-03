Meteor.startup(function() {
    var admin = Meteor.users.findOne({username: 'johntday'});
    if (!admin){
        Meteor.call('accountsCreateUser', 'johntday', 'johntday@gmail.com', '877669', function(error, retValue) {
            if(error){
                console.log("app.bootstrap.js/2", "accountsCreateUser", {'error': error, 'retValue': retValue});
            }
        });
    }



    var example1 = Diagrams.findOne({diagramId: 'example1'});
    if (!example1) {
        var eol = String.fromCharCode(13);
        var sExample1 = 'title: My title' + eol
            + 'A->B: my message' + eol
            + 'B-->A: my return message' + eol
            + 'note over A: note over A' + eol
            + 'note over A,B: note over A and B' + eol
            + 'A->B: line1\nline2' + eol
            + 'note over B: line1\nline';

        var diagram = {
            title: 'Simple Example'
            , description: 'Simple Example'
            , style: 'simple'
            , code: sExample1
            , private: false
        };
        //Diagrams.insert(diagram);
    }
});


