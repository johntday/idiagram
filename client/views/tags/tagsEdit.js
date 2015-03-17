var reactiveDict;

/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagsEdit.helpers({
    typeaheadTags: function(){
        return reactiveDict.get('typeaheadTags');
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagsEdit.created = function() {
    reactiveDict = new ReactiveDict();
    reactiveDict.set('typeaheadTags', null);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagsEdit.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagsEdit.events({
    'click .tagged': function(e, template){
        // CANNOT USE "THIS" HERE
        var self = template.data;
        e.preventDefault();
        var diagram_id = self.options.diagram_id;

        var tag = $(e.currentTarget).attr('data-tag');
        if (!self.options.removeTag){
            console.log('Missing removeTag function');
            return false;
        }
        self.options.removeTag(diagram_id, tag);
    },
    'click #addTagID': function(e) {
        e.preventDefault();
        var $inputTagID = $('#inputTagID');
        $inputTagID.val('');
        $inputTagID.focus();
    },
    'keyup #inputTagID': function(e, template) {
        e.preventDefault();
        var self = template.data;

        if (e.which == 13) {//ENTER
            var tag = validateTag( $(e.currentTarget).val() );
            if (!tag) return false;
            if (!self.options.addTag){
                console.log('Missing addTag function');
                return false;
            }
            var diagram_id = self.options.diagram_id;
            self.options.addTag(diagram_id, tag);
            $(e.currentTarget).val('');
            reactiveDict.set('typeaheadTags', null);
        } else if (e.which == 27) {//ESC
            $(e.currentTarget).val('');
            reactiveDict.set('typeaheadTags', null);
        } else {
            var searchText = $('#inputTagID').val();
            if (!searchText) {
                reactiveDict.set('typeaheadTags', null);
                return;
            }
            // user settings for regex - RegExp.escape, startsWith
            searchText = RegExp.escape(searchText);
            var showableTags = _.difference(self.options.allTags, self.tags);
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
    'blur #inputTagID': function(e) {
        $(e.currentTarget).val('');
    },
    'click ul>a.typeahead': function(e, template){
        // CANNOT USE "THIS" HERE
        var self = template.data;
        e.preventDefault();
        var tag = $(e.currentTarget).attr('data-tag');
        if (!self.options.addTag){
            console.log('Missing addTag function');
            return false;
        }
        var diagram_id = self.options.diagram_id;
        self.options.addTag(diagram_id, tag);
        reactiveDict.set('typeaheadTags', null);
        $('#inputTagID').focus();
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tagsEdit.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
