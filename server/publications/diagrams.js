Meteor.publishComposite("diagrams", function() {
    return {
        find: function() {
            return Items.find({});
    }
// ,
// children: [
//   {
//     find: function(item) {
//       return [];
//     }
//   }
// ]
}
});

Meteor.publish('diagram_id', function(id) {
    return Diagrams.find(id);
});

Meteor.publish('diagram_uid', function(uid) {
    return Diagrams.find({uid: uid});
});

Meteor.publish('diagram_lastUpdated', function() {// LIMIT TO 5
    return Diagrams.find( {userId: this.userId}, {sort: {updatedAt: -1}} );
});
Meteor.publish('diagram_lastCreated', function() {// LIMIT TO 5
    return Diagrams.find( {userId: this.userId}, {sort: {createdAt: -1}} );
});
