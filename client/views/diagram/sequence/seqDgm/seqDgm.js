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
var drawDiagram = function(code, manual){
    if (!isDirty()) return false;
    if (!code) code = $('#codeID').val();
    try {
        var style = reactiveDict.get('style');
        var options = (style) ? {theme: style} : {theme: MyEnums.SequenceDiagram.theme.SIMPLE};
        var diagram = Diagram.parse( code );
        $('#diagram').html('');
        diagram.drawSVG('diagram', options);
        console.log('finished drawDiagram');

        $('#redrawBtnID').addClass('disabled');
        setDirty(false);
    } catch (err) {
        if (manual) {
            var $element = $('#codeID').get(0);
            var lineNum = SequenceDiagramUtils.selectLineOfFirstError($element);
            if (lineNum)
                throwError("Sorry, I cannot understand line number " + (lineNum + 1) + " of your diagram text");
            else
                throwError("Sorry, I cannot understand your diagram text");
        }
    }
    $('#codeID').focus();
    return true;
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.helpers({
    titleLabel: function () {
        return reactiveDict.get('title');
    },
    handButtonActive: function(){
        return (reactiveDict.get('style') == 'hand') ? 'active' : '';
    },
    simpleButtonActive: function(){
        return reactiveDict.get('style') == 'simple' ? 'active' : '';
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.created = function() {
    //creditPurchase = new CreditPurchase();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.destroyed = function() {
    Meteor.clearTimeout( _setIntervalID );
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.events({
    'keyup #codeID': function(e) {
        e.preventDefault();
        var $element = $(e.target).get(0);
        $element.style.overflow = 'hidden';
        $element.style.height = 0;
        $element.style.height = $element.scrollHeight + 'px';

        if (isDirty() && e.which == 13) {
            drawDiagram($(e.target).val(), false);
            setDirty(false);
            setSaved(false);
        } else if (e.which != 13) {
            setDirty(true);
            setSaved(true);
        }
    },
    'keyup #titleID': function(e) {
        e.preventDefault();
        reactiveDict.set('title',  $(e.target).val() );
    },
    'click .styleID': function(e){
        var name = $(e.target).attr('name');
        if (name != reactiveDict.get('style'))
            setDirty(true);
        reactiveDict.set('style', name);
        drawDiagram(null, true);
    },
    'click #redrawBtnID': function(e) {
        e.preventDefault();
        drawDiagram(null, true);
    },
    'click #saveBtnID': function(e) {
        e.preventDefault();
        $(e.target).addClass('disabled');

        if(!Meteor.user()){
            throwError('You must login to save a diagram');
            $(e.target).removeClass('disabled');
            return false;
        }

        // GET INPUT
        var _id = this._id;
        var isInsert = !_id;

        // CREATE OBJECT
        var properties = {
            title: reactiveDict.get('title')
            , description: ''
            , style: reactiveDict.get('style')
            , code: $('#codeID').val()
            , projectId: 'test'
            //, tags: []
        };

        //if ( isAdmin(Meteor.user()) ) {
        //    _.extend(properties, {
        //        status: $('#status').val()
        //    });
        //}

        // VALIDATE
        //var isInputError = validateDiagram(properties);
        //if (isInputError) {
        //    $(e.target).removeClass('disabled');
        //    return false;
        //}

        if (isInsert) {
            Meteor.call('Diagrams.insert', properties, function(error, retValue) {
                if(error){
                    console.log("diagram_details.js/1", "Diagrams.insert", {'error': error, 'retValue': retValue});
                    throwError(error.reason);
                }else{
                    throwSuccess('Diagram saved');
                    $('#saveBtnID').addClass('disabled');
                    setSaved(false);
                }
            });
        } else {
            Meteor.call('Diagrams.update', _id, properties, function(error, retValue) {
                if(error){
                    console.log("diagram_details.js/1", "Diagrams.update", {'error': error, 'retValue': retValue});
                    throwError(error.reason);
                }else{
                    throwSuccess('Diagram saved');
                    $('#saveBtnID').addClass('disabled');
                    setSaved(false);
                }
            });
        }
        $('#codeID').focus();
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.rendered = function() {
    console.log('rendered');

    //reactiveDict.set('code', this.data.code);
    reactiveDict.set('title', this.data.title);
    reactiveDict.set('style', this.data.style);

    _setIntervalID = Meteor.setInterval(
        function(){drawDiagram(null, false)}, DefaultProperties.SequenceDiagram.updateTimeMilliSeconds );

    setDirty(true);
    $('#saveBtnID').addClass('disabled');

    drawDiagram(this.data.code, true);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
/*
title: Authentication Sequence
Alice->Bob: Authentication Request
Bob->Alice: Authentication Response
A->B: text
B-->A: text
john->quentin: getPaymentMethod(parm1,parm2)
quentin->john: how r use
note over A,B: text1
note left of A: text2
note right of A: line1\nline2
*/