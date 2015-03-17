var reactiveDict = new ReactiveDict();

var doFilter = function(){
    // INPUT
    var isStar = $('#starredID').prop( "checked" );
    var text = $('#searchTextID').val();
    var private = $('input:radio[name=private]:checked').val();
    var hideOtherPublic = $('#hideOtherPublicID').prop( "checked" );
    var sortBy = $('#sortBtnID').val();
    var sortDir = parseInt( $('input:radio[name=sortDir]:checked').val() );

    // STORE VALUES
    diagramSearchForm['isStar'] =  isStar;
    diagramSearchForm['text'] = text;
    diagramSearchForm['private'] = private;
    diagramSearchForm['hideOtherPublic'] = hideOtherPublic;
    diagramSearchForm['sortBy'] = sortBy;
    diagramSearchForm['sortDir'] = sortDir;

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
    if ( diagramSearchForm['reactiveDict'].get('tags') && diagramSearchForm['reactiveDict'].get('tags').length != 0 ) {
        filters.tags = {$all: diagramSearchForm['reactiveDict'].get('tags')};
    }

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
    tags: function(){
        return diagramSearchForm['reactiveDict'].get('tags');
    },
    options: function(){
        var options = {};
        options.allTags = appState.getTags();
        options.addTag = function(diagram_id, tag){
            var tags = diagramSearchForm['reactiveDict'].get('tags');
            tags.push(tag);
            diagramSearchForm['reactiveDict'].set('tags', tags);
            doFilter();
        };
        options.removeTag = function(diagram_id, tag){
            var tags = diagramSearchForm['reactiveDict'].get('tags');
            tags.remove(tag);
            diagramSearchForm['reactiveDict'].set('tags', tags);
            doFilter();
        };
        options.diagram_id = null;

        return options;
    }
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
    $('#starredID').prop( "checked", diagramSearchForm['isStar'] );
    $('#searchTextID').val( diagramSearchForm['text'] );
    $('#'+ diagramSearchForm['private'] +'ID').prop('checked', true);
    $('#hideOtherPublicID').prop( "checked", diagramSearchForm['hideOtherPublic'] );
    $('#sortBtnID').val( diagramSearchForm['sortBy'] );
    $('#sort'+ diagramSearchForm['sortDir'] +'ID').prop('checked', true);

    reactiveDict.set('typeaheadTags', []);

    doFilter();

    $('#searchTextID').focus();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
