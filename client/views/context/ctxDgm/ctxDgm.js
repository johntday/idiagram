var diagram_id;
var reactiveDict = new ReactiveDict();
var _setIntervalID, _setTimeoutID;
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
var toggleBoxWidth = function(){
    var boxWidth = 4;
    if ( reactiveDict.get('boxWidth') == 4 )
        var boxWidth = 6;
    reactiveDict.set('boxWidth', boxWidth);
    reactiveDict.set('diagramWidth', (12 - boxWidth));
};
var adjustTextArea = function($textarea){
    var $element = $textarea.get(0);
    $element.style.overflow = 'hidden';
    $element.style.height = 0;
    $element.style.height = 10 + $element.scrollHeight + 'px';
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgm.helpers({
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
    },
    nodes: function(){
        return reactiveDict.get('nodes');
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgm.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgm.destroyed = function() {
    //Meteor.clearInterval( _setIntervalID );
    Meteor.clearTimeout( _setTimeoutID );
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgm.events({
    'click .display-link': function(e){
        e.preventDefault();
        var source = $(e.currentTarget).data('source');
        var target = $(e.currentTarget).data('target');
        removeLink(source, target);
    },
    'click #boxWidthBtnID': function(e){
        e.preventDefault();
        toggleBoxWidth();
    },
    'click #starBtnID': function(e){
        e.preventDefault();
        if ( Diagrams.isStar(this.starredBy) ){
            Diagrams.removeStar(this._id);
        } else {
            Diagrams.addStar(this._id);
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
    'keyup #codeID': function(e) {
        e.preventDefault();
        adjustTextArea( $(e.target) );

        if (isDirty() && e.which == 13) {
            drawDiagram(null);
            setDirty(false);
            setSaved(false);
        } else if (e.which != 13) {
            setDirty(true);
            setSaved(true);
        }
    },
    'keyup #titleID': function(e) {
        e.preventDefault();
        setDirty(false);
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
        drawDiagram({showParseErr: true});
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
    },
    'mouseenter #lines-help': function (e) {
        e.preventDefault();
        $(e.currentTarget).popover('show');
    },
    'mouseleave #lines-help': function (e) {
        e.preventDefault();
        $(e.currentTarget).popover('hide');
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgm.rendered = function() {
    //console.log('data=' + JSON.stringify(this.data));
    diagram_id = this.data._id;
    $('#info').hide();
    $("form").submit(function() { return false; });
    $('#privateID').prop('checked', this.data.private);
    $('#codeID').val( this.data.code );

    reactiveDict.set('boxWidth', 4);
    reactiveDict.set('diagramWidth', (12 - 4));
    reactiveDict.set('typeaheadTags', []);

    $('#saveBtnID').addClass('disabled');
    $('#redrawBtnID').addClass('disabled');
    $('#lines-help').popover({
        title: 'Lines Help'
        ,content: '<table class="table table-striped table-condensed table-bordered"><tbody>'+
            '<tr><td>Line from A to B</td><td>A<kbd>-></kbd>B</td></tr>'+
            '<tr><td>Bidirectional line</td><td>A<kbd><-></kbd>B</td></tr>'+
            '</tbody></table>'
        ,placement: 'right'
        ,html: true
    });

    // Draw first
    _setTimeoutID = Meteor.setTimeout(function(){
        setDirty(true);
        drawDiagram(null);
    }, 200);

    // redraw every n-seconds
    //_setIntervalID = Meteor.setInterval(function(){
    //    drawDiagram(null);
    //}, 3000);
};
var drawDiagram = function(options){
    if (!isDirty()) return false;
    var graph, $code = $('#codeID'), diagramType = reactiveDict.get('diagramType');
    options = options || {};
    _.extend(options, {
        width: $('#context-div').width(),
        height: 500,
        graphSelector: '#context',
        showParseErr: options.catchParseErr || true
    });
    var poptions = _.extend(_.clone(options), {graphSelector: '#powergraph'});
    var doptions = _.extend(_.clone(options), {graphSelector: '#dotpowergraph'});
    $(options.graphSelector).html('');
    $(poptions.graphSelector).html('');
    $(doptions.graphSelector).html('');

    try {
        graph = ContextDiagramUtils.parseCode( $code.get(0), options.showParseErr );
        reactiveDict.set('nodes', graph.nodes);
        FlatGraph(graph, options);
        PowerGraph(ContextDiagramUtils.cloneGraph(graph), poptions);
        DotPowerGraph(ContextDiagramUtils.transformToDigraph(ContextDiagramUtils.cloneGraph(graph), doptions));
    } catch (err){
        if (options.showParseErr)
            throwError(err);
        return false;
    }

    adjustTextArea($code);
    $('#redrawBtnID').addClass('disabled');
    setDirty(false);
    $code.focus();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
var actions = function () {
    var oPublic = {};
    /*-------------------------*/
    oPublic.copy = function(e, data){
        e.preventDefault();
        Meteor.call('Diagrams.copy', data._id, function(error, _id) {
            if(error){
                console.log("ctxDgm.js/3", "Diagrams.copy", {'error': error, 'retValue': _id});
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
                console.log("ctxDgm.js/3", "Diagrams.deleted", {'error': error, 'retValue': retValue});
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

        if(!Meteor.user()){
            throwError('You must login to save a diagram');
            $(e.target).removeClass('disabled');
            return false;
        }

        // CREATE OBJECT
        var doc = _.extend(data, {
            code: $('#codeID').val()
            ,title: $('#titleID').val()
            ,private: $('#privateID').prop('checked')
            ,type: 'ctx'
        });

        // VALIDATE
        if (validateDiagram(doc)){
            return false;
        }
        try {
            ContextDiagramUtils.parseCode( $('#codeID').get(0), true );
        } catch (err){
            throwError(err);
            return false;
        }

        Meteor.call('Diagrams.update', data._id, doc, function(error, retValue) {
            if(error){
                console.log("ctxDgm.js/2", "Diagrams.update", {'error': error, 'retValue': retValue});
                throwError(error.reason);
            }else{
                Router.go('/view/' + data._id);
            }
        });
        return true;
    };
    /*-------------------------*/
    return oPublic;
}();
