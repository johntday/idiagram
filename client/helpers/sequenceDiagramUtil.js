SequenceDiagramUtils = function () {
    var oPublic = {};

    oPublic.selectLineOfFirstError = function(tarea){
        if (!tarea || !tarea.value) {
            console.log('Problem with SequenceDiagramUtils.selectLineOfFirstError: tarea=' + tarea);
            return false;
        }

        var code = tarea.value;
        console.log('code = '+ code);
        var lineNum = getLineOfFirstError(code);
        if (lineNum == 0){
            console.log('No Problems found with SequenceDiagramUtils.getLineOfFirstError');
            return false;
        }

        return CommonClient.selectTextareaLine(tarea, lineNum);
    };

    getLineOfFirstError = function(code){
        //var lines = code.split(/\r?\n/);
        var lines = code.split(/\r?\n/);
        console.log('found ' + lines.length + ' lines');

        for (i=0; lines.length; i++){
            console.log('Parsing line '+i+': ' + lines[i]);
            try {
                Diagram.parse( lines[i] );
                console.log('finished parsing line ' + i);
            } catch (err) {
                console.log('failed parsing line ' + i);
                return i;
            }
        }
        return 0;
    };

    oPublic.getHints = function(lineText){
        if (!lineText)
            return false;
        if (lineText.indexOf(';') != -1)
            return 'Did you include a semi-colon instead of colon?';
    };

    return oPublic;
}();