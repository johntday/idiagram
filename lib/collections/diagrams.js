Diagrams = new Mongo.Collection('diagrams');

Diagrams.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Diagrams.before.insert(function (userId, doc) {
    doc.createdAt = moment().valueOf();
    doc.userId = userId;
    doc.username = Meteor.user().username;
});

Diagrams.before.update(function (userId, doc) {
    doc.updatedAt = moment().valueOf();
    doc.updateUserId = userId;
    doc.updateUsername = Meteor.user().username;
});

//Diagrams.after.insert(function (userId, doc) {
//    console.log(doc);
//});
//Diagrams.after.update(function (userId, doc) {
//    console.log(doc);
//});

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
var diagramExample = {
    title: '',
    code: '',
    style: '',

    createdAt: '',
    userId: '',
    username: '',

    updatedAt: '',
    updateUserId: '',
    updateUsername: '',

    private: false,

    tags: []
};
