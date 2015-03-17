// BOTH
if (!Array.prototype.remove) {
    Array.prototype.remove = function(val) {
        var i = this.indexOf(val);
        return i>-1 ? this.splice(i, 1) : [];
    };
}
RegExp.escape = function (text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// CLIENT
if (Meteor.isClient){

}

// SERVER
if (Meteor.isClient){

}
