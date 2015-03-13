var t0, t1, t2, t3, dInterval;
var diagrams;
var i=0;
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
    if (t0) Meteor.clearTimeout(t0);
    if (t1) Meteor.clearTimeout(t1);
    if (t2) Meteor.clearTimeout(t2);
    if (t3) Meteor.clearTimeout(t3);
    if (dInterval) Meteor.clearInterval(dInterval);
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.landingPage.events({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.landingPage.rendered = function() {

    t0 = Meteor.setTimeout(function(){
        $('#0').fadeIn();
        t1 = Meteor.setTimeout(function(){
            $('#1').fadeIn();
            t2 = Meteor.setTimeout(function(){
                $('#2').fadeIn();
                t3 = Meteor.setTimeout(function(){
                    $('#3').fadeIn();

                    Meteor.subscribe('diagram_splash', AppProperties.splash.username, function(){
                        //diagrams = Diagrams.find({username: AppProperties.splash.username}, {sort: {modifiedAt: -1}, limit: 5, fields: {code:1}}).fetch();
                        diagrams = Diagrams.find().fetch();
                        console.log(diagrams);

                        dInterval = Meteor.setInterval(function(){
                            if (i+1 > diagrams.length) i=0;
                            drawDiagram( diagrams[i].code );
                            //console.log('i='+i);
                            i++;
                        }, 5000);
                    });

                }, 1400);
            }, 1400);
        }, 1400);
    }, 1400);

};
/*------------------------------------------------------------------------------------------------------------------------------*/
