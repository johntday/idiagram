/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyList.helpers({
    isFiltered: function(){
        return !!historySearchForm.get('doc._id');
    },
    isFilterable: function(){
        return historySearchForm.get('isFilterable');
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyList.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyList.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyList.events({
    'click #historyFilterID': function(e){
        e.preventDefault();
        if ( historySearchForm.get('doc._id') )
            historySearchForm.setDocId(null, true);
        else
            historySearchForm.set('doc._id', historySearchForm.getDocId() );
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.historyList.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
