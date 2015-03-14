//----------Global Configuration----------------------------------------------------
Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFoundPage',
    loadingTemplate: 'loadingPage',
    yieldTemplates: {
        'navbarHeader': {
            to: 'header'
        },
        //'navbarFooter': {
        //  to: 'footer'
        //},
        'eastPanel': {
            to: 'east'
        },
        'westPanel': {
            to: 'west'
        }
    }
});

Router.onBeforeAction(function () {
    if (!Meteor.loggingIn() && !Meteor.user()) {
        this.redirect('/sign-in');
    } else {
        this.next();
    }
}, {
    except: [
        'landingRoute',
        'entrySignUpRoute',
        'entrySignInRoute',
        'eulaRoute',
        'privacyRoute',
        'aboutRoute',
        'examplesRoute',
        'browserNotSupportedRoute',
        'pageNotFoundRoute',
        'entryForgotPasswordRoute',
        'entrySignOutRoute',
        'entryResetPasswordRoute',
        'viewRoute',
        'uidRoute'
    ]
});

//Router.onBeforeAction(function() {
//  this.next();
  // some hacky webkit detection stuff
  // if(!bowser.webkit){
  //   this.render('browserNotSupportedPage');
  // }else{
  //   this.next();
  // }
//});
//---------Routing Helper Functions-----------------------------------------------------
checkBrowserIsSupported = function (scope) {
    console.log('checkBrowserIsSupported');
    if (!bowser.webkit) {
        scope.render('browserNotSupportedPage');
        scope.pause();
    }
};
//--------Accounts Entry Routes------------------------------------------------------
Router.map(function () {
    this.route("entrySignUpRoute", {
        path: "/sign-up",
        template: "entrySignUpPage",
        onAfterAction: function () {
            Session.set('entryError', void 0);
            document.title = "Sign Up";
        }
    });
    this.route("entrySignInRoute", {
        path: "/sign-in",
        template: "entrySignInPage",
        onAfterAction: function () {
            Session.set('entryError', void 0);
            document.title = "Sign In";
        }
    });
    this.route("entryForgotPasswordRoute", {
        path: "/forgot-password",
        template: "entryForgotPassword",
        onAfterAction: function () {
            document.title = "Forgot Password";
            Session.set('entryError', void 0);
        }
    });
    this.route('entrySignOutRoute', {
        path: '/sign-out',
        template: "entrySignOut",
        onBeforeAction: function () {
            Session.set('entryError', void 0);
            Meteor.logout();
            Router.go('/');
        }
    });
    this.route('entryResetPasswordRoute', {
        path: 'reset-password/:resetToken',
        template: "entryResetPassword",
        onBeforeAction: function () {
            Session.set('entryError', void 0);
            Session.set('resetToken', this.params.resetToken);
            this.next();
        },
        onAfterAction: function () {
            document.title = "Reset Password";
            Session.set('entryError', void 0);
        }
    });
});
//--------Error Routes------------------------------------------------------
Router.map(function () {
    this.route("browserNotSupportedRoute", {
        path: "/notsupported",
        template: "browserNotSupportedPage",
        onAfterAction: function () {
            document.title = "Browser Not Supported";
            Session.set('entryError', void 0);
        }
    });
    this.route("pageNotFoundRoute", {
        path: "/notfound",
        template: "notFoundPage",
        onAfterAction: function () {
            document.title = "Not Found Page";
            Session.set('entryError', void 0);
        }
    });
});
//--------------------------------------------------------------
//----------App Routes------------------------------------------
//--------------------------------------------------------------
renderHomePage = function(scope){
  if (Meteor.userId()) {
    scope.render("homePage");
    scope.render("navbarHeader", {to: 'header'});
      scope.render("eastPanel", {to: 'east'});
      scope.render("westPanel", {to: 'west'});
  }else{
    scope.render("landingPage");
    scope.render("navbarHeader", {to: 'header'});
      scope.render("eastPanel", {to: 'east'});
      scope.render("westPanel", {to: 'west'});
  }
};

Router.map(function () {

    this.route('landingRoute', {
        path: '/',
        waitOn: function () {
            return Meteor.subscribe('diagram_top5');
        },
        action: function () {
            renderHomePage(this);
        },
        onAfterAction: function () {
            document.title = "iDiagram";
        }
    });
    this.route('eulaRoute', {
        path: '/eula',
        template: 'eulaPage',
        onAfterAction: function () {
            document.title = "End User License Agreement";
        }
    });
    this.route('privacyRoute', {
        path: '/privacy',
        template: 'privacyPage',
        onAfterAction: function () {
            document.title = "Privacy Policy";
        }
    });
    this.route('examplesRoute', {
        path: '/examples',
        template: 'examplesPage',
        onAfterAction: function () {
            document.title = "Examples";
        }
    });
    this.route('aboutRoute', {
        path: '/about',
        template: 'aboutPage',
        onAfterAction: function () {
            document.title = "About";
        }
    });
    this.route('feedbackRoute', {
        path: '/feedback',
        template: 'feedbackPage',
        onAfterAction: function () {
            document.title = "Feedback";
        }
    });
    this.route('seqRoute', {
        path: '/diagram/:_id',
        template: 'seqDgmPage',
        waitOn: function () {
            return Meteor.subscribe('diagram_id', this.params._id);
        },
        data: function () {
            if (this.params._id == 'add')
                return {title: 'My Title', code: 'A->B: what is your name', style: 'simple'};
            return Diagrams.findOne(this.params._id);
        },
        onAfterAction: function () {
            document.title = "Sequence Diagram";
        }
    });
    this.route('viewRoute', {
        path: '/view/:_id',
        template: 'seqDgmView',
        waitOn: function () {
            return Meteor.subscribe('diagram_id', this.params._id);
        },
        data: function () {
            return Diagrams.findOne(this.params._id);
        },
        onAfterAction: function () {
            document.title = "View Diagram";
        }
    });
    this.route('historyRoute', {
        path: '/history/:_id',
        template: 'historyPage',
        waitOn: function () {
            return Meteor.subscribe('history_id', this.params._id);
        },
        data: function () {
            return Historys.findOne(this.params._id);
        },
        onAfterAction: function () {
            document.title = "Diagram History";
        }
    });
    this.route('uidRoute', {
        path: '/uid/:_id',
        template: 'seqDgmView',
        waitOn: function () {
            return Meteor.subscribe('diagram_uid', this.params._id);
        },
        data: function () {
            return Diagrams.findOne({uid: this.params._id});
        },
        onAfterAction: function () {
            document.title = "Example Diagram " + this.params._id;
        }
    });
    this.route('seqListRoute', {
        path: '/diagrams',
        template: 'seqDgmList',
        onAfterAction: function () {
            document.title = "Sequence Diagram List";
        }
    });
    this.route('seqListParmsRoute', {
        path: '/diagrams/:isStar/:private/:hideOtherPublic/:sortBy/:sortDir',
        template: 'seqDgmList',
        onBeforeAction: function(){
            diagramSearchForm['isStar']          = (this.params.isStar == 1);
            //diagramSearchForm['text']            = text;
            diagramSearchForm['private']         = this.params.private;
            diagramSearchForm['hideOtherPublic'] = (this.params.hideOtherPublic == 1);
            diagramSearchForm['sortBy']          = this.params.sortBy;
            diagramSearchForm['sortDir']         = this.params.sortDir;

            this.next();
        },
        onAfterAction: function(){
            document.title = "Sequence Diagram List";
        }
    });
    this.route('historyListRoute', {
        path: '/historys',
        template: 'historyList',
        onAfterAction: function(){
            document.title = "History List";
        }
    });


});
