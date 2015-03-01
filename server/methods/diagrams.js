Meteor.methods({

    'Diagrams.insert': function (params) {
        return Diagrams.insert(params);
    },

    'Diagrams.update': function (_id, params) {
        return Diagrams.update(_id, {$set: params} );
    },

    'Diagrams.delete': function (_id) {
        Diagrams.remove(_id);
        return _id;
    }

});
