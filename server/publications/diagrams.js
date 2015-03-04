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
