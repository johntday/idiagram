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
        var isStar = $(e.target).prop( "checked" );
        AppProperties.diagrams.filters.isStar = isStar;
        console.log('isStar=' + isStar);



        // CREATE QUERY
        var filters = {};
        if (isStar)
            filters.starredBy = Meteor.userId();

        // RUN
        DiagramPages.set({
            filters: filters
            ,sort: {
                title: 1
            }
        });
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmList.rendered = function() {
    var isStar = AppProperties.diagrams.filters.isStar;
    var text = AppProperties.diagrams.filters.text;
    var f = DiagramPages.filters;
    //var isStar = _.isMatch( filters, {starredBy: Meteor.userId()} );
    //var isStar = _.has( filters, 'starredBy');

    // SET INPUT
    $('#starredID').prop( "checked", isStar );

    // CREATE QUERY
    var filters = {};
    if (isStar)
        filters.starredBy = Meteor.userId();

    // RUN
    DiagramPages.set({
        filters: filters
        ,sort: {
            title: 1
        }
    });

};
/*------------------------------------------------------------------------------------------------------------------------------*/
