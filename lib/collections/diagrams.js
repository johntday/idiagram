Diagrams = new Mongo.Collection('diagrams');

//Diagrams.helpers({
//});
Diagrams.addStar = function(_id){
    var userId = Meteor.userId();
    if(!userId) return false;
    Diagrams.direct.update(_id,
        { $addToSet: { starredBy: userId }, $inc: { starCnt: 1 } }
    );
    return true;
};
Diagrams.removeStar = function(_id){
    var userId = Meteor.userId();
    if(!userId) return false;
    Diagrams.direct.update(_id,
        { $pull: { starredBy: userId }, $inc: { starCnt: -1 } }
    );
    return true;
};
Diagrams.isStar = function(starredBy) {
    var userId = Meteor.userId();
    if(!userId) return false;
    return _.contains(starredBy, userId);
};

/*---------------https://atmospherejs.com/matb33/collection-hooks---------------------------------------------------------------*/
Diagrams.before.insert(function (userId, doc) {
    doc.createdAt = moment().valueOf();
    doc.userId = userId;
    doc.username = (Meteor.user()) ? Meteor.user().username : 'system';
});

Diagrams.before.update(function (userId, doc, fieldNames, modifier, options) {
    if (_.contains(fieldNames, 'starredBy') == false) {
        modifier.$set = modifier.$set || {};
        modifier.$set.updatedAt = moment().valueOf();
        modifier.$set.updateUserId = userId;
        modifier.$set.updateUsername = (Meteor.user()) ? Meteor.user().username : 'system';
    }
});

//Diagrams.after.insert(function (userId, doc) {
//    console.log(doc);
//});
//Diagrams.after.update(function (userId, doc, fieldNames, modifier, options) {
//    console.log(doc);
//});
/*------------------------------------------------------------------------------------------------------------------------------*/
DiagramPages = new Meteor.Pagination(Diagrams, {
    templateName: "seqDgmList",
    itemTemplate: "seqDgmListItem",
    dataMargin: 3,
    filters: {},
    onReloadPage1: true,
    paginationMargin: 3,
    fastRender: false,
    //router: true,
    //homeRoute: "/diagrams/",
    //route: "/diagrams/",
    //routerTemplate: "seqDgmList",
    //pageTemplate: "seqDgmListItem",
    //routerLayout: "mainLayout",
    sort: {title: 1},
    perPage: 10,
    availableSettings: {filters: true, sort: true}
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

    starCnt: 0,
    starredBy: ['userId1', 'userId2'],

    tags: []
};
