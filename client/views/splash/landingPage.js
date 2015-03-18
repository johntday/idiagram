var dInterval;
var diagrams;
var i=1;
var drawDiagram = function(code){
    try {
        var options = {theme: getRandomStyle()};
        var diagram = Diagram.parse( code );
        $('#diagram').html('');
        diagram.drawSVG('diagram', options);
    } catch (err) {
    }
};
var getRandomStyle = function(){
    return Random.choice(['simple', 'simple', 'hand']);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.landingPage.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.landingPage.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.landingPage.destroyed = function() {
    if (dInterval) Meteor.clearInterval(dInterval);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.landingPage.events({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.landingPage.rendered = function() {

    Meteor.subscribe('diagram_splash', function() {
        diagrams = Diagrams.find({tags: 'splash', username: 'johntday'}, {limit: 5}).fetch();

        if (diagrams.length != 0)
            drawDiagram(diagrams[0].code);

        dInterval = Meteor.setInterval(function(){
            if (diagrams.length != 0) {
                if (i + 1 > diagrams.length) i = 0;
                drawDiagram(diagrams[i].code);
                i++;
            } else {
                console.log('No diagrams found');
            }
        }, 3000);
    });
};
/*------------------------------------------------------------------------------------------------------------------------------*/
