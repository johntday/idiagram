Diagrams = new Mongo.Collection('diagrams');

//Diagrams.helpers({
//});
Diagrams.addStar = function(_id){
    var userId = Meteor.userId();
    if(!userId) return false;
    Diagrams.direct.update(_id,
        { $addToSet: { starredBy: userId }, $inc: { starCnt: 1 } }
    );
};
Diagrams.removeStar = function(_id){
    var userId = Meteor.userId();
    if(!userId) return false;
    Diagrams.direct.update(_id,
        { $pull: { starredBy: userId }, $inc: { starCnt: -1 } }
    );
};
Diagrams.addTag = function(_id, tag){
    var userId = Meteor.userId();
    if(!userId) return false;
    Diagrams.direct.update(_id,
        { $addToSet: { tags: tag } }
    );
    appState.addTag(tag);
};
Diagrams.removeTag = function(_id, tag){
    var userId = Meteor.userId();
    if(!userId) return false;
    Diagrams.direct.update(_id,
        { $pull: { tags: tag } }
    );
    // CANNOT REMOVE.  COULD BE SOMEWHERE ELSE
    //appState.removeTag(tag);
    Meteor.call('Diagrams.distinct.tags', function(error, retValue) {
        if(error){
        }else{
            appState.setTags( retValue.sort() );
        }
    });
};
Diagrams.hasTags = function(doc){
    return (doc && doc.tags && doc.tags.length > 0)
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
    doc.private = (doc.private===true) ? true : false; // force true or false
    doc.modifiedAt = doc.createdAt;
});
Diagrams.before.update(function (userId, doc, fieldNames, modifier, options) {
    if (!_.contains(fieldNames, 'title')) return;
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = moment().valueOf();
    modifier.$set.updateUserId = userId;
    modifier.$set.updateUsername = (Meteor.user()) ? Meteor.user().username : 'system';
    modifier.$set.modifiedAt = modifier.$set.updatedAt;
});


Diagrams.after.insert(function (userId, doc) {
    var history = {
        title: 'Created "' + doc.title + '"',
        action: 'i',
        doc: doc
    };
    Meteor.call('Historys.insert', history, function(error, retValue) {
        if(error){
            console.log("historys.js/1", "Historys.insert", {'error': error, 'retValue': retValue});
        }
    });
});
Diagrams.after.update(function (userId, doc, fieldNames, modifier, options) {
    if (!_.contains(fieldNames, 'title')) return;
    var history = {
        title: 'Updated "' + doc.title + '"',
        action: 'u',
        doc: doc
    };
    Meteor.call('Historys.insert', history, function(error, retValue) {
        if(error){
            console.log("historys.js/2", "Historys.insert", {'error': error, 'retValue': retValue});
        }
    });
});
Diagrams.after.remove(function (userId, doc) {
    //console.log('Diagrams.after.remove');
    var history = {
        title: 'Deleted "' + doc.title + '"',
        action: 'd',
        doc: doc
    };
    Meteor.call('Historys.insert', history, function(error, retValue) {
        if(error){
            console.log("historys.js/3", "Historys.insert", {'error': error, 'retValue': retValue});
        }
    });
});
/*----------------------https://atmospherejs.com/alethes/pages------------------------------------------------------------------*/
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
    type: 'seq',

    createdAt: '',
    userId: '',
    username: '',

    updatedAt: '',
    updateUserId: '',
    updateUsername: '',

    modifiedAt: '', //createdAt or updatedAt

    htmlHeader: '',
    htmlFooter: '',

    private: false,

    starCnt: 0,
    starredBy: ['userId1', 'userId2'],

    //tagged: [ {userId:'', tags: []} ]
    // after transform
    tags: ['tag1', 'tag2']
};
