Meteor.startup(function() {
    var username = 'johntday';
    var password = '877669';

    var admin = Meteor.users.findOne({username: username});
    if (!admin){
        Meteor.call('accountsCreateUser', username, 'johntday@gmail.com', password, function(error, retValue) {
            if(error){
                console.log("app.bootstrap.js/2", "accountsCreateUser", {'error': error, 'retValue': retValue});
                return false;
            }
        });
    }
    admin = Meteor.users.findOne({username: username});


    var uid = 'simple';
    var example1 = Diagrams.findOne({uid: uid});
    if (!example1) {
        var eol = '\n';
        var sExample1 = 'title: My title' + eol
            + 'A->B: my message' + eol
            + 'B-->A: my return message' + eol
            + 'note over A: note over A' + eol
            + 'note over A,B: note over A and B' + eol
            + 'note left of A: note left of A' + eol
            + 'note right of B: note right of B' + eol
            + 'A->B: line1\\nline2' + eol
            + 'note over B: line1\\nline2';

        var diagram = {
            title: 'Simple Example'
            , type: 'seq'
            , description: 'Simple Example'
            , style: 'simple'
            , code: sExample1
            , private: false
            , uid: uid
            , createdAt: moment().valueOf()
            , modifiedAt: moment().valueOf()
            , userId: admin._id
            , username: admin.username
            , tags: ['splash']
        };

        Diagrams.direct.insert(diagram);
    }

    var myusers = ['keira', 'sophia', 'quentin', 'jeanette', 'sharon'];
    _.each(myusers, function(username){
        var user = Meteor.users.findOne({username: username});
        if (!user){
            Meteor.call('accountsCreateUser', username, username+'@gmail.com', password, function(error, retValue) {
                if(error){
                    console.log("app.bootstrap.js/3", "accountsCreateUser", {'error': error, 'retValue': retValue});
                }
            });
        }
    });
});

