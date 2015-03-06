var regexQuery = function (searchText) {
    return {$regex: searchText, $options: 'i'};
};
var doFilter = function(){
    var isStar = $('#starredID').prop( "checked" );
    var text = $('#searchTextID').val();

    // STORE VALUES
    AppProperties.diagrams.filters.isStar = isStar;
    AppProperties.diagrams.filters.text = text;

    // CREATE QUERY
    var filters = {};
    if (isStar)
        filters.starredBy = Meteor.userId();
    if (text && text.length > 0)
        filters.title = regexQuery(text);

    console.log('query='+JSON.stringify(filters));

    // RUN
    DiagramPages.set({
        filters: filters
        ,sort: {title: 1}
    });
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmList.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmList.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmList.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmList.events({
    //'click input:radio[name=starredRadioName]': function(e){
    'click #starredID': function(e){
        doFilter();
    },
    'keyup #searchTextID': function(e) {
        e.preventDefault();
        doFilter();
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmList.rendered = function() {
    doFilter();
    $('#starredID').focus();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
