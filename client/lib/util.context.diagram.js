ContextDiagramUtils = function () {
    var oPublic = {};

    //"nodes":[
    //    {"name":"0","ref":"apple","width":50,"height":50},
    //],
    //    "links":[
    //    {"source":0,"target":1},

    oPublic.getLinks = function(data){
        if (!data || !data.links || !data.nodes || !Match.test(data.links, [Match.Any]) || !Match.test(data.nodes, [Match.Any])) {
            console.log('Problem with data.links: ' + data);
            return [];
        }

        var links = [];
        _.each(data.links, function(link, index){
            links.push(_.extend(link, {sourceName: data.nodes[link.source].ref, targetName: data.nodes[link.target].ref}) );
        });

        return links;
    };

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

    return oPublic;
}();