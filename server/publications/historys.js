Meteor.publish('history_top5', function() {
    return Diagrams.find({sort: {modifiedAt: -1}, limit: 5});
});
