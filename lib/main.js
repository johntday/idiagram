if (!Array.prototype.remove) {
    Array.prototype.remove = function(val) {
        var i = this.indexOf(val);
        return i>-1 ? this.splice(i, 1) : [];
    };
}

appState = new AppState();

diagramSearchForm = {};
diagramSearchForm['isStar'] = false;
diagramSearchForm['text'] = '';
diagramSearchForm['private'] = 'all';
diagramSearchForm['hideOtherPublic'] = true;
diagramSearchForm['sortBy'] = 'modifiedAt';
diagramSearchForm['sortDir'] = -1
diagramSearchForm['reactiveDict'] = new ReactiveDict();
diagramSearchForm['reactiveDict'].set('tags', []);

Deps.autorun(function () {
    if (Meteor.isClient) {
        var filters = {userId: Meteor.userId()};
        var sort = {createdAt: -1};

        HistoryPages.set({
            filters: filters
            , sort: sort
        });
    }
});
