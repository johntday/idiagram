// BOTH
getDisplayUsername = function(user){
    if (!user)
        return 'unknown';
    return (user.profile && user.profile.name) ? user.profile.name : user.username;
};

isAdmin = function(user){
    if (!user) return false;
    return (user.username == DefaultProperties.admin);
};

// CLIENT
if (Meteor.isClient){

}

// SERVER
if (Meteor.isClient){

}
