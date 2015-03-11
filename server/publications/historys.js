Meteor.publish('history_id', function(id) {
    return Historys.find(id);
});
