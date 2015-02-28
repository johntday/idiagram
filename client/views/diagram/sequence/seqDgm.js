var reactiveDict = new ReactiveDict();

var _setIntervalID;
var _dirty = true;
var setDirty = function(dirty){
    _dirty = dirty;
    if (_dirty)
        $('#redraw').removeClass('disabled');
};
var isDirty = function(){
    return _dirty
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

        $('#redraw').addClass('disabled');
        setDirty(false);
        throwSuccess('Diagram redrawn');
    } catch (err) {
        if (manual)
            throwError("Sorry, I cannot understand your diagram text");
        getLineOfFirstError(code);
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
    console.log('created');
    //creditPurchase = new CreditPurchase();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.seqDgmPage.destroyed = function() {
    console.log('destroyed');
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
        } else if (e.which != 13)
            setDirty(true);
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
    'click #redraw': function(e) {
        e.preventDefault();
        drawDiagram(null, true);
    },
    'click #save': function(e) {
        e.preventDefault();
        $(e.target).addClass('disabled');

        //if(!Meteor.user()){
        //    throwError('You must login to update a diagram');
        //    $(e.target).removeClass('disabled');
        //    return false;
        //}

        // GET INPUT
        //var _id = this._id;

        // CREATE OBJECT
        //var properties = {
        //    title: $('#title').val()
        //    , description: $('#description').val()
        //    , theme: $('#theme').val()
        //    , code: $('#codeID').val()
        //};

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

        //Meteor.call('updateDiagram', _id, properties, function(error, diagram) {
        //    if(error){
        //        console.log("diagram_details.js/1", "updated diagram", {'error': error, 'diagram': diagram});
        //        throwError(error.reason);
        //        $(e.target).removeClass('disabled');
        //    }else{
        //        Session.set('form_update', false);
        //        console.log("diagram_details.js/1", "updated diagram", {'_id': _id, 'diagram': diagram});
        //    }
        //});
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