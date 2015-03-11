var doFilter = function(){
    // INPUT
    var isStar = $('#starredID').prop( "checked" );
    var text = $('#searchTextID').val();
    var private = $('input:radio[name=private]:checked').val();
    var hideOtherPublic = $('#hideOtherPublicID').prop( "checked" );
    var sortBy = $('#sortBtnID').val();
    var sortDir = parseInt( $('input:radio[name=sortDir]:checked').val() );

    // STORE VALUES
    AppProperties.diagrams.filters.isStar = isStar;
    AppProperties.diagrams.filters.text = text;
    AppProperties.diagrams.filters.private = private;
    AppProperties.diagrams.filters.hideOtherPublic = hideOtherPublic;
    AppProperties.diagrams.sort.sortBy = sortBy;
    AppProperties.diagrams.sort.sortDir = sortDir;

    // CREATE QUERY
    var filters = {};

    if (isStar)
        filters.starredBy = Meteor.userId();
    if (text && text.length > 0)
        filters.title = CommonClient.regexQuery(text);
    if (private=='private')
        filters.private = true;
    else if (private=='public')
        filters.private = false;
    if (hideOtherPublic)
        filters.userId = Meteor.userId();
    else if (isAdmin(Meteor.user()) == false)
        filters.$or = [{userId: Meteor.userId()}, {private: false}];

    var sort = {};
    sort[sortBy] = sortDir;

    //console.log('query='+JSON.stringify(filters));
    //console.log('sort='+JSON.stringify(sort));

    // RUN
    DiagramPages.set({
        filters: filters
        ,sort: sort
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
    'click #starredID, keyup #searchTextID, click input:radio[name=private], click #hideOtherPublicID, click input:radio[name=sortDir], change #sortBtnID': function(e){
        doFilter();
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmList.rendered = function() {
    $("form").submit(function() { return false; });
    //INIT
    $('#starredID').prop( "checked", AppProperties.diagrams.filters.isStar );
    $('#searchTextID').val(AppProperties.diagrams.filters.text);
    $('#'+AppProperties.diagrams.filters.private+'ID').prop('checked', true);
    $('#hideOtherPublicID').prop( "checked", AppProperties.diagrams.filters.hideOtherPublic );
    $('#sortBtnID').val(AppProperties.diagrams.sort.sortBy);
    $('#sort'+AppProperties.diagrams.sort.sortDir+'ID').prop('checked', true);

    doFilter();

    $('#searchTextID').focus();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
