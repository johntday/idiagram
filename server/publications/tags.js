Meteor.publish('tag_id', function(id) {
    return Tags.find(id);
});

Meteor.publish('tag_userId', function() {
    return Tags.find({userId: this.userId});
});

Meteor.publish('tag_docId', function(docId) {
    return Tags.find({userId: this.userId, docId: docId});
});
