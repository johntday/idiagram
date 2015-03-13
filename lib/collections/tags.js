Tags = new Mongo.Collection('tags');

Tags.getTags = function(docId){
    var userId = Meteor.userId();
    return Tags.find({docId: docId, userId: userId}, {sort:{name:1}});
};
Tags.addTag = function(tag, docId, collection){
    return Tags.insert( {name: tag, collection: collection, docId: docId} );
};
Tags.removeTag = function(_id){
    return Tags.remove(_id);
};
/*---------------https://atmospherejs.com/matb33/collection-hooks---------------------------------------------------------------*/
Tags.before.insert(function (userId, doc) {
    doc.userId = userId;
});
/*------------------------------------------------------------------------------------------------------------------------------*/
TagPages = new Meteor.Pagination(Tags, {
    templateName: "tagList",
    itemTemplate: "tagListItem",
    dataMargin: 3,
    filters: {},
    onReloadPage1: true,
    paginationMargin: 3,
    fastRender: false,
    sort: {name: 1},
    perPage: 10,
    availableSettings: {filters: true, sort: true}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
var tagExample = {
    name: '',
    userId: '',
    collection: '',
    docId: ''
};
