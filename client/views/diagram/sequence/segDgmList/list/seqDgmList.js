var regexQuery = function (searchText) {
    return {$regex: searchText, $options: 'i'};
};
var doFilter = function(isFirst){
    var isStar;
    var text;

    if (isFirst) {
        isStar = AppProperties.diagrams.filters.isStar;
        text = AppProperties.diagrams.filters.text;

        $('#starredID').prop( "checked", isStar );
        $('#searchTextID').val(text);
    } else {
        isStar = $('#starredID').prop( "checked" );
        text = $('#searchTextID').val();

        // STORE VALUES
        AppProperties.diagrams.filters.isStar = isStar;
        AppProperties.diagrams.filters.text = text;
    }

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
        doFilter(false);
    },
    'keyup #searchTextID': function(e) {
        e.preventDefault();
        doFilter(false);
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmList.rendered = function() {
    doFilter(true);
    $('#searchTextID').focus();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
