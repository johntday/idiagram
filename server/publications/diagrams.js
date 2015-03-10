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

Meteor.publish('diagram_myCounts', function() {
    return Diagrams.find( {$or: [{userId: this.userId}, {starredBy: this.userId}] }, {private:1, userId:1, starredBy:1} );
});
