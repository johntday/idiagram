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
var drawDiagram = function(code, manual, refocus){
    if (!isDirty()) return false;
    if (!code) code = $('#codeID').val();
    try {
        var style = reactiveDict.get('style');
        var options = (style) ? {theme: style} : {theme: MyEnums.SequenceDiagram.theme.SIMPLE};
        var diagram = Diagram.parse( code );
        $('#diagram').html('');
        diagram.drawSVG('diagram', options);

        $('#redrawBtnID').addClass('disabled');
        setDirty(false);
    } catch (err) {
        if (manual) {
            var $element = $('#codeID').get(0);
            var lineNum = SequenceDiagramUtils.selectLineOfFirstError($element);
            if (lineNum)
                throwError("Sorry, I cannot understand line number " + (lineNum + 1) + " of your diagram text\nTake a look at the Cheat Sheet");
            else
                throwError("Sorry, I cannot understand your diagram text\nTake a look at the Cheat Sheet");
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
    },
    isUpdate: function(){
        return reactiveDict.get('isUpdate');
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
        adjustTextArea( $(e.target) );

        if (isDirty() && e.which == 13) {
            drawDiagram($(e.target).val(), false, true);
            setDirty(false);
            setSaved(false);
        } else if (e.which != 13) {
            setDirty(true);
            setSaved(true);
        }
    },
    'click #shareBtnID': function(e) {
        e.preventDefault();
        growl('Copy me...\n' + Meteor.absoluteUrl() + 'view/' + this._id,{
            type: 'w',
            width: 400,
            delay: 12000
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
        drawDiagram(null, true, false);
        setSaved(true);
    },
    'click #privateID': function(e) {
        setSaved(true);
    },
    'click #redrawBtnID': function(e) {
        e.preventDefault();
        drawDiagram(null, true, true);
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

        // CREATE OBJECT
        var doc = {
            title: reactiveDict.get('title')
            , description: ''
            , style: reactiveDict.get('style')
            , code: $('#codeID').val()
            , private: $('#privateID').prop('checked')
            };

        // VALIDATE
        if (validateDiagram(doc)){
            $('#codeID').focus();
            return false;
        }
        if (reactiveDict.get('isUpdate') == false) {
            Meteor.call('Diagrams.insert', doc, function(error, _id) {
                if(error){
                    console.log("seqDgm.js/1", "Diagrams.insert", {'error': error, 'retValue': retValue});
                    throwError(error.reason);
                }else{
                    throwSuccess('Diagram saved');
                    $('#saveBtnID').addClass('disabled');
                    setSaved(false);

                    //Router.go('/diagram/' + _id);
                    Router.go('/view/' + _id);
                }
            });
        } else {
            Meteor.call('Diagrams.update', _id, doc, function(error, retValue) {
                if(error){
                    console.log("seqDgm.js/2", "Diagrams.update", {'error': error, 'retValue': retValue});
                    throwError(error.reason);
                }else{
                    //throwSuccess('Diagram updated');
                    //$('#saveBtnID').addClass('disabled');
                    //setSaved(false);
                    Router.go('/view/' + _id);
                }
            });
        }
        console.log('not update or insert for _id='+_id);
        //adjustTextArea( $('#codeID') );
        //return true;
    },
    'click #deleteBtnID': function(e) {
        e.preventDefault();

        // GET INPUT
        var _id = this._id;

        Meteor.call('Diagrams.delete', _id, function(error, retValue) {
            if(error){
                console.log("seqDgm.js/3", "Diagrams.deleted", {'error': error, 'retValue': retValue});
                throwError(error.reason);
            }else{
                throwSuccess('Diagram deleted');

                Router.go('/diagrams');
            }
        });
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.rendered = function() {
    //console.log('rendered');
    $('#privateID').prop('checked', this.data.private);

    reactiveDict.set('title', this.data.title);
    reactiveDict.set('style', this.data.style);
    reactiveDict.set('isUpdate', (!!this.data._id));

    _setIntervalID = Meteor.setInterval(
        function(){drawDiagram(null, false, false)}, AppProperties.SequenceDiagram.updateTimeMilliSeconds );

    setDirty(true);
    $('#saveBtnID').addClass('disabled');
    adjustTextArea( $('#codeID') );

    drawDiagram(this.data.code, true, true);
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