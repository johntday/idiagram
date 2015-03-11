Meteor.methods({

    'Users.update.lastModified': function (doc) {
        if (!this.userId)
            return false;

        var user = Meteor.user();

        var list = user.profile.lastModified || [];
        console.log('list='+ JSON.stringify(list));

        var cleaned = _.reject( list, function(p){
           return p._id == this.userId;
        });

        var properties = _.pick(doc, '_id', 'title', 'username', 'modifiedAt' );

        cleaned.unshift(properties);
        console.log('cleaned='+ JSON.stringify(cleaned));

        Meteor.users.update( {_id: this.userId}, {$set: {'profile.lastModified': cleaned}} );
    }

});
