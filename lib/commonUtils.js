// BOTH
getDisplayUsername = function(user){
    if (!user)
        return 'unknown';
    if (user.profile && user.profile.name)
        return user.profile.name;
    return user.username;
};

// CLIENT
if (Meteor.isClient){

}

// SERVER
if (Meteor.isClient){

}
