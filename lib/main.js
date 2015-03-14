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

