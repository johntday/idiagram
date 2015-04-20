/*------------------------------------------------------------------------------------------------------------------------------*/
Template._ctxDgm.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template._ctxDgm.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template._ctxDgm.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template._ctxDgm.events({
    'mouseenter #context-help, mouseenter #powergraph-help, mouseenter #dotpowergraph-help': function(e) {
        e.preventDefault();
        $(e.currentTarget).popover('show');
    },
    'mouseleave #context-help, mouseleave #powergraph-help, mouseleave #dotpowergraph-help': function(e) {
        e.preventDefault();
        $(e.currentTarget).popover('hide');
    },
    'click .scroll-top': function(e){
        CommonClient.scrollToTopOfPageFast();
    },
    'click .scroll-to': function(e){
        CommonClient.scrollToBottomOfPageFast( '#'+$(e.currentTarget).data('where') );
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template._ctxDgm.rendered = function() {
    $('#context-help').popover({
        title: 'Context Diagram Help'
        ,content: '<table class="table table-striped table-condensed table-bordered"><tbody>'+
        '<tr><td><u>Drag nodes</u> to re-jigger the diagram.</td></tr>'+
        '<tr><td><u>Drag background</u> to pan the diagram.</td></tr>'+
        '<tr><td><u>Double-click</u> to re-center the diagram</td></tr>' +
        '<tr><td>Use <u>mouse-wheel</u> to zoom-in and out</td></tr>'+
        '</tbody></table>'

        ,placement: 'right'
        ,html: true
    });
    $('#powergraph-help').popover({
        title: 'Summary Diagram Help'
        ,content: '<table class="table table-striped table-condensed table-bordered"><tbody>'+
        '<tr><td><u>Drag nodes</u> to re-jigger the diagram.  Sometimes you need to jerk them to a good spot to uncross lines.</td></tr>'+
        '<tr><td><u>Drag background</u> to pan the diagram.</td></tr>'+
        '<tr><td><u>Double-click</u> to re-center the diagram</td></tr>' +
        '<tr><td>Use <u>mouse-wheel</u> to zoom-in and out</td></tr>'+
        '</tbody></table>'
        ,placement: 'right'
        ,html: true
    });
    $('#dotpowergraph-help').popover({
        title: 'Grid Diagram Help'
        ,content: '<table class="table table-striped table-condensed table-bordered"><tbody>'+
        '<tr><td>Sorry, <u>Drag nodes</u> is broken</td></tr>'+
        '<tr><td>Sorry, <u>Drag background</u> is broken</td></tr>'+
        '<tr><td>Sorry, <u>Double-click</u> is broken</td></tr>'+
        '<tr><td>Sorry, <u>mouse-wheel</u> is broken</td></tr>'+
        '</tbody></table>'
        ,placement: 'right'
        ,html: true
    });
};
/*------------------------------------------------------------------------------------------------------------------------------*/
