/*------------------------------------------------------------------------------------------------------------------------------*/
Template.cola.helpers({
    graphData: function(){
        return JSON.stringify( graphJson );
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.cola.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.cola.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.cola.events({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.cola.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
var graphJson = {
    nodes: [
        {"name":"0","width":50,"height":50},
        {"name":"1","width":50,"height":50},
        {"name":"2","width":50,"height":50},
        {"name":"3","width":50,"height":50},
        {"name":"4","width":50,"height":50},
        {"name":"5","width":50,"height":50},
        {"name":"6","width":50,"height":50}
    ],
    links: [
        {"source":0,"target":1},
        {"source":0,"target":3},
        {"source":0,"target":4},
        {"source":0,"target":5},
        {"source":0,"target":6},
        {"source":1,"target":6},
        {"source":2,"target":0},
        {"source":2,"target":1},
        {"source":2,"target":3},
        {"source":2,"target":4},
        {"source":2,"target":5},
        {"source":2,"target":6},
        {"source":3,"target":6},
        {"source":4,"target":1},
        {"source":4,"target":2},
        {"source":4,"target":3},
        {"source":4,"target":5},
        {"source":4,"target":6},
        {"source":5,"target":0},
        {"source":5,"target":2},
        {"source":5,"target":4},
        {"source":6,"target":1},
        {"source":6,"target":3}
    ]
};

