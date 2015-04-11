var diagram_id;
var graph;
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
    //if (!code) code = $('#codeID').val();
    //try {
    //    var style = reactiveDict.get('style');
    //    var options = (style) ? {theme: style} : {theme: 'simple'};
    //    var diagram = Diagram.parse( code );
    //    $('#diagram').html('');
    //    diagram.drawSVG('diagram', options);
    //
    //    $('#redrawBtnID').addClass('disabled');
    //    setDirty(false);
    //} catch (err) {
    //    if (manual) {
    //        var $element = $('#codeID').get(0);
    //        var lineNum = SequenceDiagramUtils.selectLineOfFirstError($element);
    //        if (lineNum)
    //            throwError("Sorry, I cannot understand line number " + (lineNum + 1) + " of your diagram text\nTake a look at the Cheat Sheet");
    //        else
    //            throwError("Sorry, I cannot understand your diagram text\nTake a look at the Cheat Sheet");
    //    }
    //}
    //if (refocus)
    //    $('#codeID').focus();
    return true;
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
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgm.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgm.destroyed = function() {
    //Meteor.clearTimeout( _setIntervalID );
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.ctxDgm.events({
    'click #centerID': function(e){
        e.preventDefault();
        //graph.center_view();
        //$('#d3_selectable_force_directed_graph').focus();
    },
    ////////////////////////////
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
            drawDiagram($(e.target).val(), false, true);
            setDirty(false);
            setSaved(false);
        } else if (e.which != 13) {
            setDirty(true);
            setSaved(true);
        }
    },
    'click #privateID': function(e) {
        setSaved(true);
    },
    'click #copyBtnID': function(e) {
        actions.copy(e, this);
    },
    'click #redrawBtnID': function(e) {
        e.preventDefault();
        drawDiagram(null, true, true);
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

    //_setIntervalID = Meteor.setInterval(
    //    function(){drawDiagram(null, false, false)}, 3000 );

    setDirty(true);
    $('#saveBtnID').addClass('disabled');

    drawDiagram(null, true, true);

    //var testID = Meteor.setTimeout(function() {
    //    graph = new SelectableForceDirectedGraph({
    //        data: reactiveDict.get('code')
    //        , width: $('#test').width()
    //        , height: 500
    //        , selector: '#svg-div'
    //        , debug: true
    //    });
    //
    //    Meteor.setTimeout(function() {
    //        graph.center_view();
    //    }, 200);
    //
    //}, 200);

    //var links = ContextDiagramUtils.getLinks( JSON.stringify(reactiveDict.get('code')) );
    //console.log('transformed links'+links);


    //doGraph(Constants.test, {
    //    width: 800, height: 1000,
    //    margin: { top: 20, right: 20, bottom: 20, left: 20 }
    //});
    //graph = {"nodes":[{"name":"2","ref":"node1","width":50,"height":50},{"name":"1","ref":"node2","width":50,"height":50},{"name":"1","ref":"node3","width":50,"height":50},{"name":"2","ref":"node4","width":50,"height":50}],"links":[{"source":"0","target":"0"},{"source":"1","target":"1"},{"source":"1","target":"1"},{"source":"2","target":"2"},{"source":"2","target":"2"}]};
    doGraph2(ContextDiagramUtils.parseCode( $('#codeID').get(0) ), {
        width: 700,
        height: 350,
        graphSelector: '#svg-div'
    });
};
var doGraph2 = function(data, options){
    var width = options.width || 700,
        height = options.height || 350,
        graphSelector = options.graphSelector || '#svg-div',
        graph = data;
    $(graphSelector).html('');
    //console.log(JSON.stringify(graph));
    var color = d3.scale.category20();
    var makeEdgeBetween;
    var colans = cola;
    function makeSVG() {
        var outer = d3.select("#svg-div").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("pointer-events", "all");
        // define arrow markers for graph links
        outer.append('svg:defs').append('svg:marker')
            .attr('id', 'end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 5)
            .attr('markerWidth', 3)
            .attr('markerHeight', 3)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5L2,0')
            .attr('stroke-width', '0px')
            .attr('fill', '#555');
        var zoomBox = outer.append('rect')
            .attr('class', 'background')
            .attr('width', "100%")
            .attr('height', "100%");
        var vis = outer.append('g');
        var redraw = function (transition) {
            return (transition ? vis.transition() : vis)
                .attr("transform", "translate(" + zoom.translate() + ") scale(" + zoom.scale() + ")");
        };
        vis.zoomToFit = function () {
            var b = cola.vpsc.Rectangle.empty();
            vis.selectAll("rect").each(function (d) {
                var bb = this.getBBox();
                b = b.union(new cola.vpsc.Rectangle(bb.x, bb.x + bb.width, bb.y, bb.y + bb.height));
            });
            var w = b.width(), h = b.height();
            var cw = Number(outer.attr("width")), ch = Number(outer.attr("height"));
            var s = Math.min(cw / w, ch / h);
            var tx = (-b.x * s + (cw / s - w) * s / 2), ty = (-b.y * s + (ch / s - h) * s / 2);
            zoom.translate([tx, ty]).scale(s);
            redraw(true);
        };
        var zoom = d3.behavior.zoom();
        zoomBox.call(zoom.on("zoom", redraw))
            .on("dblclick.zoom", vis.zoomToFit);
        return vis;
    }
    function createLabels(svg, graph, node, d3cola, margin) {
        var labelwidth = 0, labelheight = 0;
        var labels = svg.selectAll(".label")
            .data(graph.nodes)
            .enter().append("text")
            .attr("class", "label")
            .text(function (d) { return d.name; })
            .call(d3cola.drag)
            .each(function (d) {
                var bb = this.getBBox();
                labelwidth = Math.max(labelwidth, bb.width);
                labelheight = Math.max(labelheight, bb.height);
            });
        node.attr("width", labelwidth)
            .each(function (d) {
                d.width = labelwidth + 2 * margin + 10;
                d.height = labelheight + 2 * margin;
            });
        node.append("title")
            .text(function (d) { return d.name; });
        return labels;
    }
    function flatGraph() {
        var d3cola = colans.d3adaptor()
            .linkDistance(80)
            .avoidOverlaps(true)
            .size([width, height]);
        var svg = makeSVG();
        //d3.json(graphfile, function (error, graph) {
        function go(graph){
            var link = svg.selectAll(".link")
                .data(graph.links)
                .enter().append("line")
                .attr("class", "link");
            var margin = 10;
            var node = svg.selectAll(".node")
                .data(graph.nodes)
                .enter().append("rect")
                .attr("class", "node")
                .attr("rx", 4).attr("ry", 4)
                .call(d3cola.drag);
            var label = createLabels(svg, graph, node, d3cola, margin);
            d3cola
                .convergenceThreshold(0.1)
                .nodes(graph.nodes)
                .links(graph.links)
                .start(10, 10, 10);
            d3cola.on("tick", function () {
                node.each(function (d) { return d.innerBounds = d.bounds.inflate(-margin); });
                link.each(function (d) {
                    cola.vpsc.makeEdgeBetween(d, d.source.innerBounds, d.target.innerBounds, 5);
                    if (isIE())
                        this.parentNode.insertBefore(this, this);
                });
                link.attr("x1", function (d) { return d.sourceIntersection.x; })
                    .attr("y1", function (d) { return d.sourceIntersection.y; })
                    .attr("x2", function (d) { return d.arrowStart.x; })
                    .attr("y2", function (d) { return d.arrowStart.y; });
                node.attr("x", function (d) { return d.innerBounds.x; })
                    .attr("y", function (d) { return d.innerBounds.y; })
                    .attr("width", function (d) { return d.innerBounds.width(); })
                    .attr("height", function (d) { return d.innerBounds.height(); });
                var b;
                label
                    .each(function (d) {
                        b = this.getBBox();
                    })
                    .attr("x", function (d) { return d.x; })
                    .attr("y", function (d) {
                        return d.y + b.height / 3;
                    });
                //svg.zoomToFit();
            }).on("end", function () { svg.zoomToFit(); });
        }
        go(graph);
    }
    function expandGroup(g, ms) {
        if (g.groups) {
            g.groups.forEach(function (cg) { return expandGroup(cg, ms); });
        }
        if (g.leaves) {
            g.leaves.forEach(function (l) {
                ms.push(l.index + 1);
            });
        }
    }
    function getId(v, n) {
        return (typeof v.index === 'number' ? v.index : v.id + n) + 1;
    }
    function powerGraph() {
        var d3cola = colans.d3adaptor()
            .convergenceThreshold(0.01)
            .linkDistance(80)
            .handleDisconnected(false)
            .avoidOverlaps(true)
            .size([width, height]);
        var svg = makeSVG();
        //d3.json(graphfile, function (error, graph) {
        function go(graph){
            graph.nodes.forEach(function (v, i) {
                v.index = i;
            });
            var powerGraph;
            var doLayout = function (response) {
                var group = svg.selectAll(".group")
                    .data(powerGraph.groups)
                    .enter().append("rect")
                    .attr("rx", 8).attr("ry", 8)
                    .attr("class", "group")
                    .style("fill", function (d, i) { return color(i); });
                var link = svg.selectAll(".link")
                    .data(powerGraph.powerEdges)
                    .enter().append("line")
                    .attr("class", "link");
                var margin = 10;
                var node = svg.selectAll(".node")
                    .data(graph.nodes)
                    .enter().append("rect")
                    .attr("class", "node")
                    .attr("width", function (d) { return d.width + 2 * margin; })
                    .attr("height", function (d) { return d.height + 2 * margin; })
                    .attr("rx", 4).attr("ry", 4)
                    .call(d3cola.drag);
                var label = createLabels(svg, graph, node, d3cola, margin);
                var vs = response.nodes.filter(function (v) { return v.label; });
                vs.forEach(function (v) {
                    var index = Number(v.label) - 1;
                    var node = graph.nodes[index];
                    node.x = Number(v.x) * node.width / 80 + 50;
                    node.y = Number(v.y) / 1.2 + 50;
                    node.fixed = 1;
                });
                d3cola.start(1, 1, 1);
                d3cola.on("tick", function () {
                    node.each(function (d) {
                        d.bounds.setXCentre(d.x);
                        d.bounds.setYCentre(d.y);
                        d.innerBounds = d.bounds.inflate(-margin);
                    });
                    group.each(function (d) { return d.innerBounds = d.bounds.inflate(-margin); });
                    link.each(function (d) {
                        cola.vpsc.makeEdgeBetween(d, d.source.innerBounds, d.target.innerBounds, 5);
                        if (isIE())
                            this.parentNode.insertBefore(this, this);
                    });
                    link.attr("x1", function (d) { return d.sourceIntersection.x; })
                        .attr("y1", function (d) { return d.sourceIntersection.y; })
                        .attr("x2", function (d) { return d.arrowStart.x; })
                        .attr("y2", function (d) { return d.arrowStart.y; });
                    node.attr("x", function (d) { return d.innerBounds.x; })
                        .attr("y", function (d) { return d.innerBounds.y; })
                        .attr("width", function (d) { return d.innerBounds.width(); })
                        .attr("height", function (d) { return d.innerBounds.height(); });
                    group.attr("x", function (d) { return d.innerBounds.x; })
                        .attr("y", function (d) { return d.innerBounds.y; })
                        .attr("width", function (d) { return d.innerBounds.width(); })
                        .attr("height", function (d) { return d.innerBounds.height(); });
                    label.attr("x", function (d) { return d.x; })
                        .attr("y", function (d) {
                            var h = this.getBBox().height;
                            return d.y + h / 3.5;
                        });
                }).on("end", function () {
                    return svg.zoomToFit();
                });
            };
            d3cola
                .nodes(graph.nodes)
                .links(graph.links)
                .powerGraphGroups(function (d) { return (powerGraph = d).groups.forEach(function (v) { return v.padding = 10; }); });
            var modules = { N: graph.nodes.length, ms: [], edges: [] };
            var n = modules.N;
            powerGraph.groups.forEach(function (g) {
                var m = [];
                expandGroup(g, m);
                modules.ms.push(m);
            });
            powerGraph.powerEdges.forEach(function (e) {
                var N = graph.nodes.length;
                modules.edges.push({ source: getId(e.source, N), target: getId(e.target, N) });
            });
        }
    }
    function isIE() { return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); }

    flatGraph();

    function powerGraph2() {
        var d3cola = colans.d3adaptor()
            .jaccardLinkLengths(10, 0.5)
            .avoidOverlaps(true)
            .size([width, height]);
        var svg = makeSVG();
        //d3.json("test/n7e23.json", function (error, graph) {
        function go(graph){
            var powerGraph;
            d3cola
                .nodes(graph.nodes)
                .links(graph.links)
                .powerGraphGroups(function (d) {
                    powerGraph = d;
                    powerGraph.groups.forEach(function (v) { v.padding = 20; });
                })
                .start(10, 10, 10);
            var group = svg.selectAll(".group")
                .data(powerGraph.groups)
                .enter().append("rect")
                .attr("rx", 8).attr("ry", 8)
                .attr("class", "group")
                .style("fill", function (d, i) { return color(i); });
            var link = svg.selectAll(".link")
                .data(powerGraph.powerEdges)
                .enter().append("line")
                .attr("class", "link");
            var margin = 10;
            var node = svg.selectAll(".node")
                .data(graph.nodes)
                .enter().append("rect")
                .attr("class", "node")
                .attr("width", function (d) { return d.width + 2 * margin; })
                .attr("height", function (d) { return d.height + 2 * margin; })
                .attr("rx", 4).attr("ry", 4)
                .call(d3cola.drag);
            var label = svg.selectAll(".label")
                .data(graph.nodes)
                .enter().append("text")
                .attr("class", "label")
                .text(function (d) { return d.name; })
                .call(d3cola.drag);
            node.append("title")
                .text(function (d) { return d.name; });
            d3cola.on("tick", function () {
                node.each(function (d) { d.innerBounds = d.bounds.inflate(-margin); });
                group.each(function (d) { d.innerBounds = d.bounds.inflate(-margin); });
                link.each(function (d) {
                    cola.vpsc.makeEdgeBetween(d, d.source.innerBounds, d.target.innerBounds, 5);
                    if (isIE())
                        this.parentNode.insertBefore(this, this);
                });
                link.attr("x1", function (d) { return d.sourceIntersection.x; })
                    .attr("y1", function (d) { return d.sourceIntersection.y; })
                    .attr("x2", function (d) { return d.arrowStart.x; })
                    .attr("y2", function (d) { return d.arrowStart.y; });
                node.attr("x", function (d) { return d.innerBounds.x; })
                    .attr("y", function (d) { return d.innerBounds.y; })
                    .attr("width", function (d) { return d.innerBounds.width(); })
                    .attr("height", function (d) { return d.innerBounds.height(); });
                group.attr("x", function (d) { return d.innerBounds.x; })
                    .attr("y", function (d) { return d.innerBounds.y; })
                    .attr("width", function (d) { return d.innerBounds.width(); })
                    .attr("height", function (d) { return d.innerBounds.height(); });
                label.attr("x", function (d) { return d.x; })
                    .attr("y", function (d) {
                        var h = this.getBBox().height;
                        return d.y + h / 3.5;
                    });
            });
        }
        go(graph);
    }
    powerGraph2();
};
var doGraph = function(graph, options){

    var width = (options.width - options.margin.left - options.margin.right);
    var height = (options.height - options.margin.top - options.margin.bottom);

    var svg = d3.select("#svg-div").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")");

    var iterations = { "unconstrained": 10, "userConstrained": 10, "allConstraints": 1 };


    var nodeWidth = 120;
    var nodeHeight = 75;
    var nodeSpacing = 85;
    var nodeMargin = 30;
    var nodeSplineOffset = 25;
    var markerSize = 10;

    var nodeColor = "rgb(255,255,255)";
    var rootNodeColor = "rgb(255,255,208)";
    var highlightColor = "rgb(255,208,208)";

    var defaultOpacity = 0.9;
    var fadedOpacity = 0.3;

    var linkWidth = 2;
    var highlightLinkWidth = 5;

    var nodeCharEm = 1.0;
    var nodeCharPx = 7;
    var nodeLinePadPx = 12; // node box padding for line wrapping
    var nodeHeaderHeight = 18; // GO term node header box height
    var nodeHeaderBtmPadEm = 0.2; // move node term text down by this amount, for IE font differences
    var maxNodeLines = 3;
    var baseLinkDistance = 120;
    var baseSymDiffLengths = 43;

    var relScaleThreshold = 50; // graphs with more than this many nodes will have a scaling factor applied to help the solver

    var linkScaleFactor = 10; // increase link distance for large plots by total relationships divided by this value
    var symDiffFactor = 10; // increase symmetric diff lengths for large plots by total relationships divided by this value

    var linkDistance = baseLinkDistance;
    var symDiffLengths = baseSymDiffLengths;

    var legendWidth = 210;
    var legendHeight = 220;
    var legendMargin = 40;
    var legendSpacing = 40;
    var legendNodeWidth = 25;
    var legendNodeHeight = 25;

    var controlsHeight = 120;
    var controlsWidth = legendWidth;

    var enablePanning = true; // by default dragging the container is enabled - disable for node drag
    var translateBuffer = [0, 0];
    var newCoords = [0, 0]; // computed position for nodes inside zoom container to account for disabled dragging


    var rect = svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all");


    var container = svg.append("g");


    var relCnt = graph.relationships.length;
    console.log(relCnt + " relationships in this graph ");

// pre-process some values based on graph size
    if (relCnt > relScaleThreshold) {
        ald = (Math.round(relCnt / linkScaleFactor));
        linkDistance += ald;
        console.log("adding " + ald + " linkDistance to large graph ");
    }
    if (relCnt > relScaleThreshold) {
        asdl = (Math.round(relCnt / symDiffFactor));
        symDiffLengths += asdl;
        console.log("adding " + asdl + " symDiffLength to large graph ");
    }


    var rootNode = true;
    graph.nodes.forEach(function (el) {
        // inititalize the root node (first node)
        if (rootNode) {
            el.rootNode = rootNode;
            rootNode = false;
        }
        // overwrite (or initialize) the nodes w/h and maxDepth values
        el.width = (nodeWidth + nodeMargin); // add a bit of margin to route the edges
        el.height = nodeHeight;
        el.maxDepth = 0;
        el.childNodes = [];
        el.x = 400;
        el.y = 120; // no clue what the purpose of this originally was
    });


    var d3cola = cola.d3adaptor()
        .linkDistance(linkDistance)
        .avoidOverlaps(true)
        .size([width, height]);

// initialize constraints object
    graph.constraints = [{ "type": "alignment", "axis": "x", "offsets": [{ "node": "0", "offset": "0" }] },
        { "type": "alignment", "axis": "y", "offsets": [{ "node": "0", "offset": "0" }] }];

// initialize offsets which will be used to generate constraints after maxDepth recursion
    graph.xOffsets = [];
    graph.yOffsets = [];


// re-index relationships by array key using IDs
    graph.relationships.forEach(function (el) {
        // could be optimized by iterating once and creating tmp array, then selecting by key
        var i = 0;
        graph.nodes.forEach(function (myNode) {
            if (myNode.identifier == el.source) { el.source = i; }
            if (myNode.identifier == el.target) { el.target = i; }
            i++;
        });
    });

// compute max depth from root node for a given node index, assigning max depth to the node
    var nodeIdx, myDepth, myIdx, newBranch, pad;
    var recurseNodeRels = function (nodeIdx, myDepth, myIdx, newBranch, pad) {
        var hasChild = false;
        pad = pad + "  ";
        graph.relationships.forEach(function (rel) {
            if (rel.source == myIdx) { // the current node has a child
                hasChild = true;
                graph.nodes[myIdx].childNodes[rel.target] = rel.target; // dont just add target here, must be multi-dimensional
                if (newBranch) {
                    myDepth = graph.nodes[rel.source].maxDepth; // reset the depth when starting a new branch
                    newBranch = false;
                }
                if (myDepth > graph.nodes[myIdx].maxDepth) {
                    graph.nodes[myIdx].maxDepth = myDepth;
                    graph.yOffsets[myIdx] = { "node": myIdx, "offset": (-(myDepth * linkDistance)) };
                }
                myDepth++;
                recurseNodeRels(nodeIdx, myDepth, rel.target, newBranch, pad);
                newBranch = true;
            }
        });
        if (!hasChild) {
            if (myDepth > graph.nodes[myIdx].maxDepth) {
                graph.nodes[myIdx].maxDepth = (myDepth);
                graph.yOffsets[myIdx] = { "node": myIdx, "offset": (-(myDepth * linkDistance)) };
            }
        }
    };

// trace the heirarchy and assign the depth value to each node
    recurseNodeRels(0, 0, 0, true, '');

// after recursion, set the y constraints with offsets (heirarchy row maxDepth)
    //graph.yOffsets.forEach(function (el) { graph.constraints[1].offsets.push(el); });

// build x offset array with node ids for each depth value
    var xCnts = [];
    graph.nodes.forEach(function (myNode) {
        if (!xCnts[myNode.maxDepth]) { xCnts[myNode.maxDepth] = []; }// initialize a number value for counting
        xCnts[myNode.maxDepth].push(graph.nodes.indexOf(myNode)); // save each index
    });

    console.log('xCnts');
    console.log(xCnts);


// for a given node, find the proper x offset
    var computeXOffset = function (myNode) {
        rowRange = ((xCnts[myNode.maxDepth].length()) * linkDistance); // compute row pixel width for all the nodes at this depth
        myCtr = (rowRange / 2);
    };

// we know how many nodes fall at each depth, now assign the offset value to the node
    var n = 0;
    //xCnts.forEach(function (d) {
    //    d.forEach(function (x) {
    //        constraint = { "node": x, "offset": ((nodeWidth + nodeSpacing) * d.indexOf(x)) };
    //    });
    //    n++;
    //});


    d3cola
        .nodes(graph.nodes)
        .links(graph.relationships)
        //.constraints(graph.constraints)
        // .flowLayout("y", -100)
        .symmetricDiffLinkLengths(symDiffLengths)
        .avoidOverlaps(true)
        .start(iterations.unconstrained, iterations.userConstrained, iterations.allConstraints);


    var relColor = function (relCode) {
        // console.log('rel code '+relCode);
        if (relCode == 'is_a') { return "#555"; }
        if (relCode == 'part_of') { return "blue"; }
        if (relCode == 'has_part') { return "purple"; }
        if (relCode == 'regulates') { return "orange"; }
        if (relCode == 'positively_regulates') { return "green"; }
        if (relCode == 'negatively_regulates') { return "red"; }
        if (relCode == 'occurs_in') { return "cyan"; }
    };

    var link = container.selectAll(".link")
        .data(graph.relationships)
        .enter().append("path")
        .style('stroke-width', '2px')
        .style('stroke-opacity', 0.8)
        .style('stroke', function (d) { return relColor(d.rel); })
        .style('fill', 'none')
        //.enter().append("line")
        .attr("class", function (d) { return "link " + d.rel; });


    var linkMarker = container.selectAll(".marker")
        .data(graph.relationships)
        .enter().append("path")
        .style('fill-opacity', defaultOpacity)
        .style('stroke', function (d) { return relColor(d.rel); })
        .style('fill', function (d) { return relColor(d.rel); })
        .attr("class", function (d) { return "marker " + d.rel; });


    var guideline = container.selectAll(".guideline")
        .data(graph.constraints.filter(function (c) { return c.type === 'alignment'; }))
        .enter().append("line")
        .attr("class", "guideline")
        .attr("stroke-dasharray", "5,5");

    var node = container.selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("rect")
        // .attr("class", "node")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        // .attr("rx", 2).attr("ry", 2)
        .style('stroke', '#222')
        .style('stroke-width', '1px')
        .style('background', 'white')
        .style('fill-opacity', defaultOpacity)
        .style("fill", function (d) {
            if (d.rootNode) { return rootNodeColor; }
            else { return nodeColor; }
        });

// node header box with GO ID
    var nodeHeader = container.selectAll(".nodeHeader")
        .data(graph.nodes)
        .enter().append("rect")
        .attr("class", "nodeHeader")
        .attr("width", nodeWidth)
        .attr("height", nodeHeaderHeight)
        .style('stroke', '#222')
        .style('stroke-width', '1px')
        .style('background', 'white')
        .style('fill-opacity', 0)
        .style('fill', 'red')
        .style('cursor', 'pointer');


    var outputTSpan = function (d, el, line, idx, lineCnt) {
        // shift lines down by index, and up by 1/2 line count, minus 1 line for title
        var dyVal = (((idx * nodeCharEm) - ((lineCnt * 0.5) * nodeCharEm) + nodeCharEm) + nodeHeaderBtmPadEm);
        d3.select(el).append("tspan")
            .text(line)
            .attr("dy", dyVal + "em") // y offset per line index
            .attr("x", 0) // positioned on tick
            .attr("y", 0) // positioned on tick
            .style('fill', '#222')
            .style('font-family', 'Arial')
            .style('font-size', '13px')
            .style('text-anchor', 'middle')
            .style('text-align', 'center')
            .style('dominant-baseline', 'middle')
            .attr("class", "nodeTextSpan");
    };

    var wrapText = function (d, el) {
        var arr = d.name.split(" "); // array split by space
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  doing GO term: "+d.name);
        if (arr !== undefined) {
            var linePxW = 0; // counting approximate pixel width- will only work well for monospaced font.  choose an average value on the low side.
            var linePxWNext = 0; // counting what the character count will be for i+1 words, to pre-determine how to wrap or hyphenate
            var ln = 0; // line count
            var outLines = [];
            var myLine = "";
            var innerNodeWidth = (nodeWidth - (2 * nodeLinePadPx)); // inside box minus padding for word wrap
            // first split any hyphenated words that are longer than a line.
            for (i = 0; i < arr.length; i++) {
                undIdx = arr[i].indexOf("-");
                if (undIdx > 0) {
                    wordPxW = (arr[i].length * nodeCharPx);
                    if (wordPxW >= innerNodeWidth) {
                        firstPart = (arr[i].substring(0, (undIdx + 1)));
                        lastPart = (arr[i].substring(undIdx + 1));
                        // console.log('first: '+firstPart+' last: '+lastPart);
                        arr.splice(i, 1, firstPart, lastPart);
                    }
                }
            }
            // console.log(arr);
            for (i = 0; i < arr.length; i++) {
                // get approximate px width of word arr[i]
                wordPxW = (arr[i].length * nodeCharPx);
                linePxW += wordPxW; // current pixel width of the line
                linePxWNext = linePxW;
                // width line will be, after adding the next word, if one exists
                if (arr[i + 1]) { linePxWNext = (linePxWNext + 1 + (arr[i + 1].length * nodeCharPx)); }
                myLine = (myLine + " " + arr[i]);
                // console.log("myLine = "+myLine);
                // if we will exceed the max width in px, wrap the line.
                if (linePxWNext >= innerNodeWidth) {
                    outLines.push(myLine);
                    ln++; // increment the line
                    linePxW = 0; // reset the line px count
                    linePxWNext = 0; // reset the line px next count
                    myLine = ""; // reset the line txt
                } else if (outLines.length && (!arr[i + 1])) {
                    // this is the last line, and we're already building the multi-line arr so go with it
                    outLines.push(myLine);
                }
            }
            // generate the text lines using our line array
            if (outLines.length) {
                var outLinesTot = outLines.length;
                if (outLinesTot > maxNodeLines) { outLinesTot = maxNodeLines; }
                for (i = 0; i < outLines.length; i++) {
                    if ((i >= (maxNodeLines - 1)) && (outLines[i + 1])) {
                        toOutput = (outLines[i] + "..."); // truncate
                        outputTSpan(d, el, toOutput, i, outLinesTot);
                        break;
                    }
                    outputTSpan(d, el, outLines[i], i, outLinesTot);
                }
            } else {
                // console.log("outputting d.name directly = "+d.name);
                outputTSpan(d, el, d.name, 0, 1);
            }
        }
    };


    var nodeHeaderText = container.selectAll(".nodeHeaderText")
        .data(graph.nodes)
        .enter().append("text")
        .text(function (d, i) { return d.databaseSpecificId; })
        // .text(function (d,i) { return d.databaseSpecificId + " id=" + i+" d=" + d.maxDepth; })
        .attr("x", 0) // positioned on tick
        .attr("y", 0) // positioned on tick
        .style('fill', '#777')
        .style('font-family', 'Arial')
        .style('font-size', '11px')
        .style('text-anchor', 'left')
        .style('text-align', 'left')
        .style('cursor', 'pointer')
        .attr("class", "nodeHeaderText");


    var label = container.selectAll(".nodeTextContainer")
        .data(graph.nodes)
        .enter().append("g")
        .style('text-align', 'center')
        .style('text-anchor', 'middle')
        .style('margin', 0)
        .style('padding', 0)
        .attr("class", "nodeTextContainer")
        .append("text")
        .attr("class", "nodeText")
        .style('text-align', 'center')
        .style('text-anchor', 'middle')
        .each(function (d) { wrapText(d, this); });


    /* overlay node gets the drag behavior */
    var nodeOverlay = container.selectAll(".nodeOverlay")
        .data(graph.nodes)
        .enter()
        .append("rect")
        .attr("class", "nodeOverlay")
        .style('fill-opacity', 0.2)
        .style('fill', 'green')
        .style('cursor', 'move')
        .attr("width", nodeWidth)
        .attr("height", nodeHeight - nodeHeaderHeight)
        .call(d3cola.drag);


    nodeOverlay.append("title")
        .text(function (d) { return (d.name); });

    var ticking = true;

    d3cola.on("tick", function () {
        //if (!ticking) return;
        ticking = false;
        link.attr("d", linkSpline);
        linkMarker.attr("d", markerPath);

        node.attr("x", function (d) { return d.x - nodeWidth / 2; })
            .attr("y", function (d) { return d.y - d.height / 2; });

        nodeOverlay.attr("x", function (d) { return d.x - (nodeWidth / 2); })
            .attr("y", function (d) { return d.y - (d.height / 2) + nodeHeaderHeight; });

        label.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
        nodeHeader.attr("transform", function (d) {
            return "translate(" + (d.x - nodeWidth / 2) + "," + (d.y - d.height / 2) + ")";
        });
        nodeHeaderText.attr("transform", function (d) {
            return "translate(" + ((d.x - nodeWidth / 2) + 4) + "," + ((d.y - d.height / 2) + 13) + ")";
        });
    });


    function linkSpline(d) {
        // source position
        var xS = (d.source.bounds.x + (d.source.width / 2)); // center of source node
        var yS = (d.source.bounds.y); // top of source node
        // target position
        var xT = (d.target.bounds.X - (d.target.width / 2)); // x center of target node
        var yT = (d.target.bounds.Y + markerSize); // bottom of target node, accounting for marker height
        // source control point
        var xSc = xS;
        var ySc = (yS - nodeSplineOffset);
        // target control point
        var xTc = xT;
        var yTc = (yT + nodeSplineOffset);
        // second node
        var x2 = (xT);
        var y2 = (yS - nodeSplineOffset);
        // second control point
        var x2c = x2;
        var y2c = yS;

        var x3 = (xT);
        var y3 = (yT + (nodeSpacing / 2));

        var x4 = (xT - xS); // this should be dynamically generated to route thru parent levels
        var y4 = (yT + nodeSpacing);

        // simple cubic b spline  with 2 control points, end to end
        b = "M" + xS + "," + yS + " C" + xSc + "," + ySc + " " + xTc + "," + yTc + " " + xT + "," + yT + " ";
        return b;
    }

    function markerPath(d) {
        // manual markers since angular breaks svg markers
        var m1x = (d.target.bounds.X - (d.target.width / 2));
        var m1y = (d.target.bounds.Y);

        var m2x = (d.target.bounds.X - (d.target.width / 2)) - (markerSize / 2);
        var m2y = (d.target.bounds.Y + markerSize);

        var m3x = (d.target.bounds.X - (d.target.width / 2)) + (markerSize / 2);
        var m3y = m2y;

        var mTx = m1x;
        var mTy = m1y;

        b = "M" + m1x + "," + m1y + " L" + m2x + "," + m2y + " L" + m3x + "," + m3y + " L" + mTx + "," + mTy + "Z";
        return b;
    }
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
            ,title: reactiveDict.get('title')
            ,private: $('#privateID').prop('checked')
            ,type: 'ctx'
        });

        // VALIDATE
        //if (validateDiagram(doc)){
        //    return false;
        //}

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
