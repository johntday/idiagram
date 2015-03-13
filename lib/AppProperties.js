AppProperties = {
    SequenceDiagram: {
        updateTimeMilliSeconds: 5000
    },
    admin: 'johntday',
    signupcode: 'photon',
    showSignUpCode: false,
    enableEastPanel: true,
    version: '0.1.3',

    diagrams: {
        filters:{
            isStar: false,
            text: '',
            private: 'all',
            hideOtherPublic: true
        },
        sort: {
            sortBy: 'modifiedAt',
            sortDir: -1
        }
    },
    splash: {
        username: 'keira'
    },

    userTags: [],
    addTag: function(tag){
        var i = _.sortedIndex(this.userTags, tag);
        if (i != -1)
            this.userTags.splice(i, 0, tag);
    },
    removeTag: function(tag){
        var i = _.indexOf(this.userTags, tag, true);
        if (i != -1)
            this.userTags.splice(i, 1);
    }
};
