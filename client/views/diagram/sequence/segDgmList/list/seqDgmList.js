var regexQuery = function (searchText) {
    return {$regex: searchText, $options: 'i'};
};
var doFilter = function(){
    // INPUT
    var isStar = $('#starredID').prop( "checked" );
    var text = $('#searchTextID').val();
    var private = $('input:radio[name=private]:checked').val();

    console.log('INPUT: ', isStar, text, private);

    // STORE VALUES
    AppProperties.diagrams.filters.isStar = isStar;
    AppProperties.diagrams.filters.text = text;
    AppProperties.diagrams.filters.private = private;

    // CREATE QUERY
    var filters = {};
    if (isStar)
        filters.starredBy = Meteor.userId();
    if (text && text.length > 0)
        filters.title = regexQuery(text);
    if (private=='private')
        filters.private = true;
    else if (private=='public')
        filters.private = false;

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
    'click #starredID, keyup #searchTextID, click input:radio[name=private]': function(e){
        doFilter();
    //},
    //'keyup #searchTextID': function(e) {
    //    e.preventDefault();
    //    doFilter();
    //},
    //'click input:radio[name=private]': function(e){
    //    console.log( $(e.target).val() );
    }

});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmList.rendered = function() {
    //INIT
    $('#starredID').prop( "checked", AppProperties.diagrams.filters.isStar );
    $('#searchTextID').val(AppProperties.diagrams.filters.text);
    $('#'+AppProperties.diagrams.filters.private+'ID').prop('checked', true);

    doFilter();

    $('#searchTextID').focus();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
