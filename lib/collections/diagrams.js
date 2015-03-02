Diagrams = new Mongo.Collection('diagrams');

Diagrams.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Diagrams.before.insert(function (userId, doc) {
    doc.createdAt = moment().valueOf();
    doc.userId = userId;
    var user = Meteor.users.find(userId);
    doc.username = getDisplayUsername(user);
});

Diagrams.before.update(function (userId, doc) {
    doc.updatedAt = moment().valueOf();
    doc.updateUserId = userId;
    var user = Meteor.users.find(userId);
    doc.updateUsername = getDisplayUsername(user);
});
/*------------------------------------------------------------------------------------------------------------------------------*/
DiagramPages = new Meteor.Pagination(Diagrams, {
    templateName: "seqDgmList",
    itemTemplate: "seqDgmListItem",
    dataMargin: 3,
    filters: {},
    onReloadPage1: false,
    paginationMargin: 3,
    //router: true,
    //homeRoute: "/diagrams/",
    //route: "/diagrams/",
    //routerTemplate: "seqDgmList",
    //pageTemplate: "seqDgmListItem",
    //routerLayout: "mainLayout",
    sort: { title: 1 },
    perPage: 10
});
/*------------------------------------------------------------------------------------------------------------------------------*/
var diagram = {
    title: '',
    code: '',
    style: '',

    createdAt: '',
    userId: '',
    username: '',

    updatedAt: '',
    updateUserId: '',
    updateUsername: '',

    tags: []
};
