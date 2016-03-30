var diagram_id;
var reactiveDict = new ReactiveDict();
var _setIntervalID;
var _dirty = true;
var _saved = true;
var setDirty = function(dirty){
    _dirty = dirty;
    if (_dirty)
        $('#redrawBtnID').removeClass('disabled');
};
var isDirty = function(){
    return _dirty
};
var setSaved = function(saved){
    _saved = saved;
    if (_saved)
        $('#saveBtnID').removeClass('disabled');
};
var isSaved = function(){
    return _saved
};
var drawDiagram = function(type, code, manual, refocus){
    if (!isDirty()) return false;
    if (!code) code = $('#codeID').val();

    try {
        var style = reactiveDict.get('style');
        var options = (style) ? {theme: style} : {theme: 'simple'};
        var diagram;

        $('#diagram').html('');

        if (type=='img') {
            var htmlString = ImageDiagramUtils.parseCode(code);
            $('#diagram').html(htmlString);
        } else if (type=='ctx') {
            var htmlString = ContextDiagramUtils.parseCode(code, style);
            $('#diagram').html(htmlString);
        } else if (type=='seq') {
            diagram = Diagram.parse(code);
            diagram.drawSVG('diagram', options);
        }

        $('#redrawBtnID').addClass('disabled');
        setDirty(false);
    } catch (err) {
        if (manual) {
            if (type=='ctx' || type=='img') {
                console.log("seqDgm.drawDiagram: ", type, code, manual, refocus);
            } else if (type=='seq') {
                var $element = $('#codeID').get(0);
                var lineNum = SequenceDiagramUtils.selectLineOfFirstError($element);
                if (lineNum)
                    throwError("Sorry, I cannot understand line number " + (lineNum + 1) + " of your diagram text\nTake a look at the Cheat Sheet");
                else
                    throwError("Sorry, I cannot understand your diagram text\nTake a look at the Cheat Sheet");
            }
        }
    }
    if (refocus)
        $('#codeID').focus();

    return true;
};
var adjustTextArea = function($textarea){
    var $element = $textarea.get(0);
    $element.style.overflow = 'hidden';
    $element.style.height = 0;
    $element.style.height = 10 + $element.scrollHeight + 'px';
};
var toggleBoxWidth = function(){
    var boxWidth = 4;
    if ( reactiveDict.get('boxWidth') == 4 )
        var boxWidth = 6;
    reactiveDict.set('boxWidth', boxWidth);
    reactiveDict.set('diagramWidth', (12 - boxWidth));
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.helpers({
    titleLabel: function () {
        return reactiveDict.get('title');
    },
    handButtonActive: function () {
        return (reactiveDict.get('style') == 'hand') ? 'active' : '';
    },
    simpleButtonActive: function () {
        return reactiveDict.get('style') == 'simple' ? 'active' : '';
    },
    boxArrow: function () {
        return (reactiveDict.get('boxWidth')==4) ? 'right' : 'left';
    },
    boxWidth: function () {
        return reactiveDict.get('boxWidth');
    },
    diagramWidth: function () {
        return reactiveDict.get('diagramWidth');
    },
    star: function(){
        return Diagrams.isStar(this.starredBy)? 'star' : 'star-o';
    },
    options: function(){
        var options = {};
        options.allTags = appState.getTags();
        options.addTag = Diagrams.addTag;
        options.removeTag = Diagrams.removeTag;
        options.diagram_id = this._id;

        return options;
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.created = function() {
    historySearchForm.setDocId(this.data._id);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.destroyed = function() {
    Meteor.clearTimeout( _setIntervalID );
    historySearchForm.setDocId(null);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.events({
    'click #boxWidthBtnID': function(e){
        e.preventDefault();
        toggleBoxWidth();

        var $code = $('#codeID');
        adjustTextArea( $code );
        $code.focus();
    },
    'click #starBtnID': function(e){
        e.preventDefault();
        var userId = Meteor.userId();
        if(!userId){
            throwError('You must login to play with stars');
            return false;
        }
        if ( Diagrams.isStar(this.starredBy) ){
            Diagrams.removeStar(this._id);
        } else {
            Diagrams.addStar(this._id);
        }
    },
    'keyup #codeID': function(e) {
        e.preventDefault();
        adjustTextArea( $(e.target) );

        if (isDirty() && e.which == 13) {
            drawDiagram(this.type, $(e.target).val(), false, true);
            setDirty(false);
            setSaved(false);
        } else if (e.which != 13) {
            setDirty(true);
            setSaved(true);
        }
    },
    'click #shareBtnID': function(e) {
        e.preventDefault();
        growl(/*'Copy me...\n' + */Meteor.absoluteUrl() + 'view/' + this._id,{
            type: 'w',
            width: 400,
            delay: 12000,
            align: 'center'
        });
    },
    'keyup #titleID': function(e) {
        e.preventDefault();
        reactiveDict.set('title',  $(e.target).val() );
        setSaved(true);
    },
    'click .styleID': function(e){
        var name = $(e.target).attr('name');
        if (name != reactiveDict.get('style'))
            setDirty(true);
        reactiveDict.set('style', name);
        drawDiagram(this.type, null, true, false);
        setSaved(true);
    },
    'click #privateID': function(e) {
        setSaved(true);
    },
    'click #copyBtnID': function(e) {
        actions.copy(e, this);
    },
    'click #redrawBtnID': function(e) {
        e.preventDefault();
        drawDiagram(this.type, null, true, true);
    },
    'click #saveBtnID': function(e) {
        actions.save(e, this);
    },
    'click #deleteBtnID': function(e) {
        actions.delete(e, this);
    },
    'click #infoBtnID': function(e) {
        e.preventDefault();
        var $info = $('#info');
        $info.toggle('slow');
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.rendered = function() {
    diagram_id = this.data._id;
    $('#info').hide();
    $("form").submit(function() { return false; });

    $('#privateID').prop('checked', this.data.private);

    reactiveDict.set('title', this.data.title);
    reactiveDict.set('style', this.data.style);
    reactiveDict.set('type',  this.data.type)   || 'seq'; // default to 'seq' for older
    reactiveDict.set('boxWidth', 4);
    reactiveDict.set('diagramWidth', (12 - 4));
    reactiveDict.set('typeaheadTags', []);

    _setIntervalID = Meteor.setInterval(
        function(){drawDiagram(reactiveDict.get('type'), null, false, false)}, 3000 );

    setDirty(true);
    $('#saveBtnID').addClass('disabled');
    adjustTextArea( $('#codeID') );

    drawDiagram(this.data.type, this.data.code, true, true);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
var actions = function () {
    var oPublic = {};
    /*-------------------------*/
    oPublic.copy = function(e, data){
        e.preventDefault();
        Meteor.call('Diagrams.copy', data._id, function(error, _id) {
            if(error){
                console.log("seqDgm.js/3", "Diagrams.copy", {'error': error, 'retValue': _id});
                throwError(error.reason);
            }else{
                throwSuccess('Diagram copied');
                Router.go('/diagram/' + _id);
            }
        });
    };
    /*-------------------------*/
    oPublic.delete = function(e, data) {
        e.preventDefault();

        Meteor.call('Diagrams.delete', data._id, function(error, retValue) {
            if(error){
                console.log("seqDgm.js/3", "Diagrams.deleted", {'error': error, 'retValue': retValue});
                throwError(error.reason);
            }else{
                throwSuccess('Diagram deleted. Archived copy in history');

                Router.go('/diagrams');
            }
        });
    };
    /*-------------------------*/
    oPublic.save = function(e, data) {
        e.preventDefault();
        $(e.target).addClass('disabled');
        var code = $('#codeID').val();

        if(!Meteor.user()){
            throwError('You must login to save a diagram');
            return false;
        }

        // CREATE OBJECT
        var doc = {
            title: reactiveDict.get('title')
            , style: reactiveDict.get('style')
            , code: code
            , private: $('#privateID').prop('checked')
            , type: reactiveDict.get('type')
        };

        // VALIDATE
        if (validateDiagram(doc)){
            $('#codeID').focus();
            return false;
        }
        try {
            var style = reactiveDict.get('style');
            var options = (style) ? {theme: style} : {theme: 'simple'};

            if (reactiveDict.get('type') == 'seq')
                var diagram = Diagram.parse( code );
            // TODO:  validate for ctx
        } catch (err) {
            var $element = $('#codeID').get(0);
            var lineNum = SequenceDiagramUtils.selectLineOfFirstError($element);
            if (lineNum)
                throwError("Sorry, I cannot understand line number " + (lineNum + 1) + " of your diagram text\nTake a look at the Cheat Sheet");
            else
                throwError("Sorry, I cannot understand your diagram text\nTake a look at the Cheat Sheet");

            $('#codeID').focus();
            return false;
        }

        Meteor.call('Diagrams.update', data._id, doc, function(error, retValue) {
            if(error){
                console.log("seqDgm.js/2", "Diagrams.update", {'error': error, 'retValue': retValue});
                throwError(error.reason);
            }else{
                throwSuccess('Diagram saved');
                Router.go('/view/' + data._id);
            }
        });
        return true;
    };
    /*-------------------------*/
    return oPublic;
}();
