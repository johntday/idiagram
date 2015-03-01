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
