Historys = new Mongo.Collection('historys');

//Historys.helpers({
//});
/*---------------https://atmospherejs.com/matb33/collection-hooks---------------------------------------------------------------*/
Historys.before.insert(function (userId, doc) {
    doc.createdAt = moment().valueOf();
    doc.userId = userId;
    doc.username = (Meteor.user()) ? Meteor.user().username : 'system';
});
/*------------------------------------------------------------------------------------------------------------------------------*/
HistoryPages = new Meteor.Pagination(Historys, {
    templateName: "historyList",
    itemTemplate: "historyListItem",
    dataMargin: 3,
    filters: {},
    onReloadPage1: true,
    paginationMargin: 3,
    fastRender: false,
    sort: {createdAt: -1},
    perPage: 10,
    availableSettings: {filters: true, sort: true}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
var historyExample = {
    title: '',
    action: '',
    doc: '',

    createdAt: '',
    userId: '',
    username: ''
};
