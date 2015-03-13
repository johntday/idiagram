Meteor.methods({

    'Tags.insert': function (doc) {
        return Tagss.insert(doc);
    },

    'Tags.delete': function (_id) {
        return Tagss.remove(_id);
    }


});
