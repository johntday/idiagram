var doFilter = function(){
    // INPUT
    var isStar = $('#starredID').prop( "checked" );
    var text = $('#searchTextID').val();
    var noun = $('#searchNounID').val();
    var private = $('input:radio[name=private]:checked').val();
    var hideOtherPublic = $('#hideOtherPublicID').prop( "checked" );
    var sortBy = $('#sortBtnID').val();
    var sortDir = parseInt( $('input:radio[name=sortDir]:checked').val() );

    // STORE VALUES
    feedbackSearchForm['isStar'] =  isStar;
    feedbackSearchForm['text'] = text;
    feedbackSearchForm['noun'] = noun;
    feedbackSearchForm['private'] = private;
    feedbackSearchForm['hideOtherPublic'] = hideOtherPublic;
    feedbackSearchForm['sortBy'] = sortBy;
    feedbackSearchForm['sortDir'] = sortDir;

    // CREATE QUERY
    var filters = {};

    if (isStar)
        filters.starredBy = Meteor.userId();
    if (text)
        filters.title = CommonClient.regexQuery(text);
    if (noun)
        filters.$or = [{code: new RegExp('^' + RegExp.escape(noun), 'im')}, {code: new RegExp(RegExp.escape('>'+noun+':'), 'im')}];
    if (private=='private')
        filters.private = true;
    else if (private=='public')
        filters.private = false;
    if (hideOtherPublic)
        filters.userId = Meteor.userId();
    else if (!isAdmin(Meteor.user())) {
        filters.$or = [{userId: Meteor.userId()}, {private: false}];
    }
    if ( feedbackSearchForm['reactiveDict'].get('tags') && feedbackSearchForm['reactiveDict'].get('tags').length != 0 ) {
        filters.tags = {$all: feedbackSearchForm['reactiveDict'].get('tags')};
    }

    var sort = {};
    sort[sortBy] = sortDir;

    //console.log('query='+JSON.stringify(filters));
    //console.log('sort='+JSON.stringify(sort));

    // RUN
    CommentPages.set({
        filters: filters
        ,sort: sort
    });
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.feedbackList.helpers({
    tags: function(){
        return feedbackSearchForm['reactiveDict'].get('tags');
    },
    options: function(){
        var options = {};
        options.allTags = appState.getTags();
        options.addTag = function(diagram_id, tag){
            var tags = feedbackSearchForm['reactiveDict'].get('tags');
            tags.push(tag);
            feedbackSearchForm['reactiveDict'].set('tags', tags);
            doFilter();
        };
        options.removeTag = function(diagram_id, tag){
            var tags = feedbackSearchForm['reactiveDict'].get('tags');
            tags.remove(tag);
            feedbackSearchForm['reactiveDict'].set('tags', tags);
            doFilter();
        };
        options.diagram_id = null;

        return options;
    },
    isAdvSearch: function(){
        return feedbackSearchForm['reactiveDict'].get('isAdvSearch');
    },
    advancedButtonActive: function () {
        return (feedbackSearchForm['reactiveDict'].get('isAdvSearch')) ? 'active' : '';
    },
    simpleButtonActive: function () {
        return (!feedbackSearchForm['reactiveDict'].get('isAdvSearch')) ? 'active' : '';
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.feedbackList.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.feedbackList.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.feedbackList.events({
    'click #starredID, click input:radio[name=private], click #hideOtherPublicID, click input:radio[name=sortDir], change #sortBtnID': function(e){
        doFilter();
    },
    'keyup #searchTextID, keyup #searchNounID': function(e){
        doFilter();
    },
    'click .searchTypeID': function(e){
        var name = $(e.target).attr('name');
        toggleSearchType(name);
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.feedbackList.rendered = function() {
    $("form").submit(function() { return false; });
    //INIT
    $('#starredID').prop( "checked", feedbackSearchForm['isStar'] );
    $('#searchTextID').val( feedbackSearchForm['text'] );
    $('#searchNounID').val( feedbackSearchForm['noun'] );
    $('#'+ feedbackSearchForm['private'] +'ID').prop('checked', true);
    $('#hideOtherPublicID').prop( "checked", feedbackSearchForm['hideOtherPublic'] );
    $('#sortBtnID').val( feedbackSearchForm['sortBy'] );
    $('#sort'+ feedbackSearchForm['sortDir'] +'ID').prop('checked', true);
    toggleSearchType( (feedbackSearchForm['reactiveDict'].get('isAdvSearch')) ? 'advanced' : 'simple' );

    doFilter();

    $('#searchTextID').focus();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
var toggleSearchType = function(name){
    if (name == 'simple') {

        $('#form-searchNounID').hide();
        feedbackSearchForm['reactiveDict'].set('isAdvSearch', false);
        var noun = $('#searchNounID').val('');
        feedbackSearchForm['noun'] = '';
        doFilter();
    }else {
        $('#form-searchNounID').show();
        feedbackSearchForm['reactiveDict'].set('isAdvSearch', true);
    }
};
