var drawDiagram = function(where, doc){
    try {
        var options = {theme: doc.style};
        var diagram = Diagram.parse( doc.code );
        $('#'+where).html('');
        diagram.drawSVG(where, options);
    } catch (err) {
        throwError("Sorry, I cannot understand your diagram text");
        return false;
    }
    return true;
};
var adjustTextArea = function($textarea){
    var $element = $textarea.get(0);
    $element.style.overflow = 'hidden';
    $element.style.height = 0;
    $element.style.height = 10 + $element.scrollHeight + 'px';
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.example.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.example.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.example.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.example.events({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.example.rendered = function() {

};
/*------------------------------------------------------------------------------------------------------------------------------*/
