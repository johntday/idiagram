//Meteor.publishComposite("diagrams", function() {
//    return {
//        find: function() {
//            return Items.find({});
//    }
// ,
// children: [
//   {
//     find: function(item) {
//       return [];
//     }
//   }
// ]
//}
//});

Meteor.publish('diagram_id', function(id) {
    return Diagrams.find(id);
});

Meteor.publish('diagram_uid', function(uid) {
    return Diagrams.find({uid: uid});
});

Meteor.publish('diagram_top5', function() {
    return Diagrams.find({userId: this.userId}, {sort: {modifiedAt: -1}, limit: 5});
});

Meteor.publish('diagram_splash', function(username) {
    return Diagrams.find({username: username}, {sort: {modifiedAt: -1}, limit: 5, fields: {code:1}});
});
