ImageDiagramUtils = function () {
    var oPublic = {};

    /**
     * Parse input.
     * @param url String.
     * @returns {*}
     */
    oPublic.parseCode = function(url){
        var htmlString = '';

        if (!url) {
            console.log('Problem with ImageDiagramUtils.parseCode: url=' + url);
            return htmlString;
        }

        htmlString = '<img src="' + url + '">';
        return htmlString;
    };

    return oPublic;
}();