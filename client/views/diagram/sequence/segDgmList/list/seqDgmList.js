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
        filters.tags = {$in: diagramSearchForm['reactiveDict'].get('tags')};
        //filters.tags = diagramSearchForm['reactiveDict'].get('tags');
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
    typeaheadTags: function(){
        return reactiveDict.get('typeaheadTags');
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
    },
    'keyup #inputTagID': function(e) {
        e.preventDefault();
        if (e.which == 13) {//ENTER
            var tag = validateTag( $(e.currentTarget).val() );
            if (!tag) return false;

            //Diagrams.addTag(this._id, tag);
            //$('#inputTagID').hide();
            //$('#addTagID').show();
            $(e.currentTarget).val('');
            reactiveDict.set('typeaheadTags', null);
            var tags = diagramSearchForm['reactiveDict'].get('tags');
            tags.push(tag);
            diagramSearchForm['reactiveDict'].set('tags', tags);
            doFilter();
        } else if (e.which == 27) {//ESC
            //$('#inputTagID').hide();
            //$('#addTagID').show();
            $(e.currentTarget).val('');
            reactiveDict.set('typeaheadTags', null);
        } else {
            var searchText = $('#inputTagID').val();
            if (!searchText) {
                reactiveDict.set('typeaheadTags', []);
                return;
            }
            var showableTags = _.difference(appState.getTags(), this.tags);
            if (showableTags) {
                var items = [];
                _.each(showableTags, function (tag) {
                    var myRe = new RegExp(".*" + searchText + ".*");//, "g");
                    var myArray = myRe.exec(tag);
                    if (myArray && myArray.length != 0) {
                        items.push(tag);
                    }
                });
                reactiveDict.set('typeaheadTags', items);
            }
        }
    },
    'click .tagged': function(e){
        e.preventDefault();
        // CANNOT USE THIS HERE
        var tag = $(e.currentTarget).attr('data-tag');
        var tags = diagramSearchForm['reactiveDict'].get('tags');
        tags.remove(tag);
        diagramSearchForm['reactiveDict'].set('tags', tags);
        doFilter();
    },
    'click ul>a.typeahead': function(e){
        e.preventDefault();
        var tag = $(e.currentTarget).attr('data-tag');
        $('#inputTagID').val('');
        reactiveDict.set('typeaheadTags', null);
        var tags = diagramSearchForm['reactiveDict'].get('tags');
        tags.push(tag);
        diagramSearchForm['reactiveDict'].set('tags', tags);
        doFilter();
    },
    'blur #inputTagID': function(e) {
        e.preventDefault();
        if ( $(e.relatedTarget).attr('class') == 'typeahead' )
            return false;
        $(e.currentTarget).val('');
        reactiveDict.set('typeaheadTags', null);
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
