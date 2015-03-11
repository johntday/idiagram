Meteor.methods({

    'Historys.insert': function (doc) {
        return Historys.insert(doc);
    },

    'Historys.delete': function (_id) {
        return Historys.remove(_id);
    }


});
