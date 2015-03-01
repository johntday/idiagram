Diagrams = new Mongo.Collection('diagrams');

Diagrams.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Diagrams.before.insert(function (userId, doc) {
    doc.createdAt = moment.unix();
    doc.userId = userId;
    var user = Meteor.users.find(userId);
    doc.username = (user) ? user.username : "unknown";
});

Diagrams.before.update(function (userId, doc) {
    doc.updatedAt = moment.unix();
    doc.updateUserId = userId;
    var user = Meteor.users.find(userId);
    doc.updateUsername = (user) ? user.username : "unknown";
});
/*------------------------------------------------------------------------------------------------------------------------------*/
DiagramPages = new Meteor.Pagination(Diagrams, {
    templateName: "seqDgmList",
    itemTemplate: "seqDgmListItem",
    dataMargin: 3,
    //router: true,
    //homeRoute: "/diagrams/",
    //route: "/diagrams/",
    //routerTemplate: "seqDgmList",
    //pageTemplate: "seqDgmListItem",
    //routerLayout: "mainLayout",
    sort: { _id: 1 },
    perPage: 5
});
