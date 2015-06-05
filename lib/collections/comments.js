Comments = new Mongo.Collection('comments');

//Comments.helpers({
//});
/*---------------https://atmospherejs.com/matb33/collection-hooks---------------------------------------------------------------*/
Comments.before.insert(function (userId, doc) {
    doc.createdAt = moment().valueOf();
    doc.userId = userId;
    doc.username = (Meteor.user()) ? Meteor.user().username : 'system';
    doc.private = (doc.private===true) ? true : false; // force true or false
    doc.modifiedAt = doc.createdAt;
});
Comments.before.update(function (userId, doc, fieldNames, modifier, options) {
    if (!_.contains(fieldNames, 'title')) return;
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = moment().valueOf();
    modifier.$set.updateUserId = userId;
    modifier.$set.updateUsername = (Meteor.user()) ? Meteor.user().username : 'system';
    modifier.$set.modifiedAt = modifier.$set.updatedAt;
});
/*----------------------https://atmospherejs.com/alethes/pages------------------------------------------------------------------*/
//CommentPages = new Meteor.Pagination(Comments, {
//    templateName: "seqDgmList",
//    itemTemplate: "seqDgmListItem",
//    dataMargin: 3,
//    filters: {},
//    onReloadPage1: true,
//    paginationMargin: 3,
//    fastRender: false,
//    //router: true,
//    //homeRoute: "/comments/",
//    //route: "/comments/",
//    //routerTemplate: "seqDgmList",
//    //pageTemplate: "seqDgmListItem",
//    //routerLayout: "mainLayout",
//    sort: {title: 1},
//    perPage: 10,
//    availableSettings: {filters: true, sort: true}
//});
/*------------------------------------------------------------------------------------------------------------------------------*/
var commentExample = {
    title: '',
    description: '',

    createdAt: '',
    userId: '',
    username: '',

    updatedAt: '',
    updateUserId: '',
    updateUsername: '',

    modifiedAt: '', //createdAt or updatedAt

    private: false,

    starCnt: 0,
    starredBy: ['userId1', 'userId2'],

    //tagged: [ {userId:'', tags: []} ]
    // after transform
    tags: ['tag1', 'tag2']
};
