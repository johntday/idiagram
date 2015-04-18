ContextDiagramUtils = function () {
    var oPublic = {};

    //"nodes":[
    //    {"name":"0","ref":"apple","width":50,"height":50},
    //],
    //    "links":[
    //    {"source":0,"target":1},

    /**
     * Parse input.
     * @param tarea String OR textArea element.
     * @param showParseErr
     * @returns {*}
     */
    oPublic.parseCode = function(tarea, showParseErr){
        var isString = Match.test(tarea, String);
        if (!tarea || (!isString && !tarea.value)) {
            console.log('Problem with ContextDiagramUtils.parseCode: tarea=' + tarea);
            return false;
        }
        var code = (isString) ? tarea : tarea.value;
        var nodes = {};
        var links = [];
        var lines = code.split(/\r?\n/);
        var nodeCnt = 0;

        // NODES
        _.each(lines, function(line, index){
            if (line.length != 0) {
                var reverse = false;
                var sourceTarget = line.split('->');
                if (sourceTarget.length != 2) {
                    if (showParseErr && !isString) {
                        CommonClient.selectTextareaLine(tarea, index);
                    }
                    throw 'Problem with line #' + index;
                }

                var source = sourceTarget[0].trim(),
                    target = sourceTarget[1].trim();

                if (source.endsWith('<')) {
                    reverse = true;
                    source = source.substring(0, source.length - 1).trim();
                }
                if (!_.has(nodes, source)) nodes[source] = nodeCnt++;
                if (!_.has(nodes, target)) nodes[target] = nodeCnt++;

                links.push({sourceName: source, targetName: target});
                if (reverse)
                    links.push({sourceName: target, targetName: source});
            }
        });

        // LINES
        _.each(links, function(link){
            _.extend(link, {source: nodes[link.sourceName], target: nodes[link.targetName]});
        });
        links = _.sortBy(links, function(link){
            return link.source;
        })

        // NODE ARRAY
        var nodeArray = [];
        _.each(_.keys(nodes), function(nodeName){
            nodeArray.push( {"name":""+nodes[nodeName],"ref":nodeName,"width":50,"height":50} );
        });

        //console.log(JSON.stringify({nodes: nodeArray, links: links}));
        return {nodes: nodeArray, links: links};
    };

    oPublic.transformToDigraph = function(graph){
        //digraph G {
        //    u0[label = "0"];
        //    u0 -> u25[label = "()"];
        //}
        var output = 'digraph G {\n';
        _.each(graph.nodes, function(node){
            output += 'u';
            output += node.name;
            output += '[label="';
            output += node.ref;
            output += '"];\n'
        });
        _.each(graph.links, function(link){
            output += 'u';
            output += link.source.name;
            output += '->u';
            output += link.target.name;
            output += '[label = "()"];\n'
        });
        output += '}';
        //console.log(output);
        return output;
    };

    oPublic.cloneGraph = function(graph){
        var pgraph = {nodes:[], links:[]};
        _.each(graph.nodes, function(node){
            pgraph.nodes.push(_.clone(node));
        });
        _.each(graph.links, function(link){
            pgraph.links.push(_.clone(link));
        });
        return pgraph;
    };


    return oPublic;
}();