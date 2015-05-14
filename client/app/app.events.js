Meteor.startup(function () {
    Hooks.init();

    Hooks.onLoggedIn = function () {
        removeWallpaper();
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
