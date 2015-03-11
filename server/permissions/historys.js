Historys.allow({
    'insert': function(userId, doc) {
        return canEdit(userId);
    },
    'update': function(userId, doc, fields, modifier) {
        return false;
    },
    'remove': function(userId, doc) {
        return canEdit(userId);
    }
});
