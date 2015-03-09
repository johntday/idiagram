AccountsEntry = {
    settings: {
        defaultProfile: {}
    },
    config: function (appConfig) {
        this.settings = _.extend(this.settings, appConfig);
        return this.settings;
    }
};


Meteor.startup(function () {
    return AccountsEntry.config({
        signupCode: AppProperties.signupcode
    });
});


Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl('reset-password/' + token);
};

Meteor.methods({
    entryValidateSignupCode: function (signupCode) {
        // IGNORE FOR NOW
        //console.log('received: ' + signupCode);
        //console.log('should be: ' + AccountsEntry.settings.signupCode);
        //return signupCode === AccountsEntry.settings.signupCode;
        return (AppProperties.showSignUpCode) ? signupCode === AccountsEntry.settings.signupCode : true;
    },
    accountsCreateUser: function (username, email, password) {
        if (username) {
            return Accounts.createUser({
                username: username,
                email: email,
                password: password,
                profile: _.extend(AccountsEntry.settings.defaultProfile, {name: username})
            });
        } else {
            return Accounts.createUser({
                email: email,
                password: password,
                profile: _.extend(AccountsEntry.settings.defaultProfile, {name: email})
            });
        }
    }
});


Accounts.onCreateUser(function (options, user) {
    var d6 = function () {
        return Math.floor(Random.fraction() * 6) + 1;
    };
    user.dexterity = d6() + d6() + d6();
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;

    var userId = user._id;
    //console.log('Accounts.onCreateUser');
    //console.log(user);
    //console.log(userId);

    return user;
});


Meteor.startup(function () {

    var dataCursor = Meteor.users.find();

    var initFinished = false;
    var handle = dataCursor.observeChanges({
        added: function (id, record) {
            if (initFinished) {
                console.log("Received a new user! " + id);
                console.log(record);

                //if(record.emails[0].verified === false){
                Accounts.emailTemplates.siteName = "iDiagram";
                Accounts.emailTemplates.from = "iDiagram Admin <johntday@gmail.com>";
                Accounts.emailTemplates.enrollAccount.subject = function (user) {
                    return "Welcome to iDiagram, " + user.profile.name;
                };
                Accounts.emailTemplates.enrollAccount.text = function (user, url) {
                    return "To activate your account, simply click the link below:\n\n" + url;
                };

                Accounts.sendVerificationEmail(id);
                //}
            }
        }
    });
    initFinished = true;

});
