Meteor.startup(function () {
    Hooks.init();

    Hooks.onLoggedIn = function () {
        removeWallpaper();

        Meteor.call('Diagrams.counts', function(error, retValue) {
            if(error) {
                console.log("app.startup.js/3", "Diagrams.counts", {'error': error, 'retValue': retValue});
            }else{
                diagramCnts.set('all', retValue.all);
                diagramCnts.set('private', retValue.private);
                diagramCnts.set('public', retValue.public);
                diagramCnts.set('starred', retValue.starred);
            }
        });
    };
    Hooks.onLoggedOut = function (userId) {
    };
    Hooks.onCreateUser = function (userId) {

    };
    Hooks.onDeleteUser = function (userId) {

    };
    Hooks.onLoseFocus = function (userId) {

    };
    Hooks.onGainFocus = function (userId) {

    };
    Hooks.onCloseSession = function (userId) {

    };
});
