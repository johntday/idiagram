ContextDiagramUtils = function () {
    var oPublic = {};

    /**
     * Parse input.
     * @param code String.
     * @returns {*}
     */
    oPublic.parseCode = function(code, style){
        var htmlString = '';
        var isString = Match.test(code, String);
        if (!code || !isString) {
            console.log('Problem with ContextDiagramUtils.parseCode: code=' + code);
            return htmlString;
        }
        if (style=='hand')
            style = 'scruffy';
        else if (style=='simple')
            style = 'plain';
        else {
            console.log('Problem with ContextDiagramUtils.parseCode: style=' + style);
            return htmlString;
        }

        var lines = code.split(/\r?\n/);

        if (lines.length > 0) {
            htmlString = '<img src="http://yuml.me/diagram/' + style + '/class/' + lines[0];

            for (i=1; i < lines.length; i++) {
                console.log('Parsing line ' + i + ': ' + lines[i]);
                htmlString += ',' + lines[i];
            }
            htmlString += ' "> ';

            $('#diagram').html(htmlString);
        }
        return htmlString;
    };

    return oPublic;
}();