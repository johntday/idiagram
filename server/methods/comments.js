Meteor.methods({

    'Comments.insert': function (params) {
        return Comments.insert(params);
    },
    'Comments.update': function (_id, params) {
        return Comments.update(_id, {$set: params} );
    },
    'Comments.delete': function (_id) {
            Comments.remove(_id);
        return _id;
    }

});
