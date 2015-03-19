// BOTH
getDisplayUsername = function(user){
    if (!user)
        return 'unknown';
    return (user.profile && user.profile.name) ? user.profile.name : user.username;
};
isAdmin = function(user){
    if (!user)
        user = Meteor.user();
    if (!user) return false;
    return (user.username == Constants.adminUsername);
};
canEdit = function(ownerId){
    var user = Meteor.user();
    return (user && (user._id == ownerId || user.username == Constants.adminUsername));
};

// CLIENT
if (Meteor.isClient){
}

// SERVER
if (Meteor.isClient){

}
