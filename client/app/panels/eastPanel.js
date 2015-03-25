/*------------------------------------------------------------------------------------------------------------------------------*/
Template.eastPanel.helpers({
    isFiltered: function(){
        return !!historySearchForm.get('doc._id');
    },
    isFilterable: function(){
        return historySearchForm.get('isFilterable');
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.eastPanel.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.eastPanel.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.eastPanel.events({
    'click #eastRightArrowBtnID': function(e){
        e.preventDefault();
        toggleEastPanel();
    },
    'click #historyFilterID': function(e){
        e.preventDefault();
        if ( historySearchForm.get('doc._id') )
            historySearchForm.setDocId(null, true);
        else
            historySearchForm.set('doc._id', historySearchForm.getDocId() );
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.eastPanel.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
