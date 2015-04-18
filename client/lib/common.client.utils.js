CommonClient = function () {
    var oPublic = {};

    /**
     * Object toString.
     * @param myobject
     * @returns object string.
     */
    oPublic.toString = function (myobject) {
        if (typeof myobject === 'undefined')
            return "undefined";
        if (myobject === null)
            return "null";
//		    var s = "";
//		    for(var propertyName in myobject) {
//			    s += propertyName + ":'" + myobject[propertyName] + "', ";
//		    }
        //return s.substring(0, s.length-2);
        return JSON.stringify(myobject);
    };

    /*
     * Scroll to top of page animated FAST
     */
    oPublic.scrollToTopOfPageFast = function () {
        $('html, body').animate({scrollTop: 0}, 'fast');
    };

    /*
     * Scroll to bottom of page animated FAST
     */
    oPublic.scrollToBottomOfPageFast = function (selector, animationSpeed) {
        animationSpeed = (animationSpeed) ? animationSpeed : 200;
        if (selector)
            $("html, body").animate({scrollTop: $(selector).offset().top - 60}, animationSpeed);
    };

    // Returns an event map that handles the "escape" and "return" keys and
    // "blur" events on a text input (given by selector) and interprets them
    // as "ok" or "cancel"
    oPublic.okCancelEvents = function (selector, callbacks) {
        var ok = callbacks.ok || function () {
            };
        var cancel = callbacks.cancel || function () {
            };

        var events = {};
        events['keyup ' + selector + ', keydown ' + selector + ', focusout ' + selector] =
            function (evt) {
                if (evt.type === "keydown" && evt.which === 27) {
                    // escape = cancel
                    cancel.call(this, evt);

                } else if (evt.type === "keyup" && evt.which === 13 ||
                    evt.type === "focusout") {
                    // blur/return/enter = ok/submit if non-empty
                    var value = String(evt.target.value || "");
                    if (value)
                        ok.call(this, value, evt);
                    else
                        cancel.call(this, evt);
                }
            };

        return events;
    };

    oPublic.activateInput = function (input) {
        input.focus();
        input.select();
    };

    /**
     * Select a line of text in TextArea.
     * @param tarea textarea element.
     * @param lineNum line number of textarea.
     * @returns {boolean} success or failure.
     */
    oPublic.selectTextareaLine = function (tarea, lineNum) {
        if (!tarea || !lineNum) {
            console.log('Problem with Common.selectTextareaLine: tarea=' + tarea + ', lineNum=' + lineNum);
            return false;
        }

        //lineNum--; // array starts at 0
        var lines = tarea.value.split(/\r?\n/);

        // calculate start/end
        var startPos = 0, endPos = tarea.value.length;
        for (var x = 0; x < lines.length; x++) {
            if (x == lineNum) {
                break;
            }
            startPos += (lines[x].length + 1);
        }

        var endPos = lines[lineNum].length + startPos;

        // do selection
        // Chrome / Firefox
        if (typeof(tarea.selectionStart) != "undefined") {
            tarea.focus();
            tarea.selectionStart = startPos;
            tarea.selectionEnd = endPos;
            return lineNum;
        }

        // IE
        if (document.selection && document.selection.createRange) {
            tarea.focus();
            tarea.select();
            var range = document.selection.createRange();
            range.collapse(true);
            range.moveEnd("character", endPos);
            range.moveStart("character", startPos);
            range.select();
            return lineNum;
        }

        return false;
    };

    oPublic.regexQuery = function (searchText) {
        return {$regex: RegExp.escape(searchText), $options: 'i'};
    };

    oPublic.isProduction = function() {
        return (Meteor.absoluteUrl().indexOf("localhost:3000") == -1);
    };


    return oPublic;
}();