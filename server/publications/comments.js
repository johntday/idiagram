Meteor.publish('comment_id', function(id) {
    return Comments.find(id);
});
