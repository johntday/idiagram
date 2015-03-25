historySearchForm = new ReactiveDict();
historySearchForm.set('doc._id', null);
historySearchForm.setDocId = function(_id, isToggle){
    historySearchForm.set('doc._id', _id);
    if (_id) {
        historySearchForm.set('doc._id.temp', _id);
        historySearchForm.set('isFilterable', true);
    } else if (!isToggle)
        historySearchForm.set('isFilterable', false);
};
historySearchForm.getDocId = function(){
    if ( historySearchForm.get('doc._id') )
        return historySearchForm.get('doc._id');
    else
        return historySearchForm.get('doc._id.temp');
};
