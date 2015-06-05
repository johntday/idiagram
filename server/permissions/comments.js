Comments.allow({
    'insert': function(userId, doc) {
        return !!userId;
    },
    'update': function(userId, doc, fields, modifier) {
        return canEdit(userId);
    },
    'remove': function(userId, doc) {
        return canEdit(userId);
    }
});
