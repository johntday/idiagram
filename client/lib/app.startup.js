Session.setDefault('resize', null);

Meteor.startup(function () {
    if (Meteor.userId()) {
        removeWallpaper();
    } else {
        setWallpaper();
    }

    $(window).resize(function (evt) {
        Session.set("resize", new Date());
    });

    //bowser = BrowserObserver.init();

    Meteor.call('Diagrams.distinct.tags', function(error, retValue) {
        if(error){
        }else{
            appState.setTags( retValue.sort() );
        }
    });

    Deps.autorun(function () {
        if (Meteor.isClient) {
            var filters = {userId: Meteor.userId()};
            var sort = {createdAt: -1};

            HistoryPages.set({
                filters: filters
                , sort: sort
            });
        }
    });

});

setWallpaper = function () {
    //console.log('setting wallpaper...');
    $('html').addClass('landscapeLogin');
};
removeWallpaper = function () {
    //console.log('removing wallpaper...');
    $('html').removeClass('landscapeLogin');
};


Meteor.startup(function () {

    Meteor.call('getEnvironmentRoot', function (error, result) {
        if (error) {
            console.log(error);
        }
        if (result) {
            //console.log('current environment url:  ' + result);
            if (result === "http://localhost:3000") {
                // do local development stuff
            } else {
                // do production stuff
            }

        }
    });


});
