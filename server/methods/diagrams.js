Meteor.methods({

    'Diagrams.insert': function (params) {
        return Diagrams.insert(params);
    },
    'Diagrams.update': function (_id, params) {
        return Diagrams.update(_id, {$set: params} );
    },
    'Diagrams.delete': function (_id) {
        Diagrams.remove(_id);
        return _id;
    },
    'Diagrams.copy': function(_id){
        var diagram = Diagrams.findOne(_id);
        if (!diagram) return false;

        var doc = _.pick(diagram, ['title', 'code', 'style']);
        doc.title = 'NEW: ' + doc.title;
        var new_id;

        Meteor.call('Diagrams.insert', doc, function(error, _id) {
            if(error){
                console.log("methods.diagrams.js/1", "Diagrams.copy", {'error': error, 'retValue': _id});
                throwError(error.reason);
            }else{
                new_id = _id;
            }
        });
        return new_id;
    },
    'Diagrams.counts': function () {
        var userId = this.userId;
        var docs = Diagrams.find( {$or: [{userId: userId}, {starredBy: userId}]}, {userId:1, private:1, starredBy:1} );
        var all = 0;
        var private = 0;
        var public = 0;
        var starred = 0;

        docs.forEach(function (doc) {
            if (userId == doc.userId) {
                all++;
                if (doc.private)
                    private++;
                else
                    public++;
            }
            if (_.contains(doc.starredBy, userId))
                starred++;
        });
        //console.log(all, private, public, starred);
        //diagramCnts.set('all',all);
        //diagramCnts.set('private', private);
        //diagramCnts.set('public', public);
        //diagramCnts.set('starred', starred);

        return {all: all, private: private, public: public, starred: starred};
    }

});
